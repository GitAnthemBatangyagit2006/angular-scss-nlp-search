import { Injectable } from '@angular/core';
import * as BenefitsNLP from './benefitNLP';

@Injectable({ providedIn: 'root' })
export class BenefitNLPSearchSummaryModel {
  transformBenefitSummaryToModel(
    transformBenefitSummaryRequest: BenefitsNLP.TransformBenefitSummaryRequest
  ): BenefitsNLP.BenefitSummarySearchResult {
    const transformedBenefitsListAndFilters =
      this.getTransformedBenefitsListAndFilters(
        transformBenefitSummaryRequest.nlpBenefitsSummarySearchResult,
        transformBenefitSummaryRequest.filterKeys
      );
    return {
      documentId:
        transformBenefitSummaryRequest.nlpBenefitsSummarySearchResult
          .documentId,
      contractUid: transformBenefitSummaryRequest.contractUid,
      dateOfServicepPlanType: transformBenefitSummaryRequest.effectiveDate,
      benefitSummary: transformedBenefitsListAndFilters.benefitsSummaries,
      filteredBenefitSummary: this.filterBenefitSummary(
        transformedBenefitsListAndFilters.benefitsSummaries,
        transformBenefitSummaryRequest.filterKeys
      ).length
        ? this.filterBenefitSummary(
            transformedBenefitsListAndFilters.benefitsSummaries,
            transformBenefitSummaryRequest.filterKeys
          )
        : transformedBenefitsListAndFilters.benefitsSummaries,
      filters: transformedBenefitsListAndFilters.availableFilters,
      selectedFilters:
        transformedBenefitsListAndFilters.availableFilters.filter(
          (filter) => filter.selected
        ),
    };
  }

  filterBenefitSummary(
    benefitSummarylist: BenefitsNLP.NlpBenefitsSummary[],
    filterKeys: BenefitsNLP.BenefitSummaryFilter[]
  ): BenefitsNLP.NlpBenefitsSummary[] {
    return benefitSummarylist.filter((benefit) => {
      return (
        benefit.network.serviceLocations.some((serviceLocation: string) => {
          return this.match(
            filterKeys,
            BenefitsNLP.BenefitSummaryFilterType.PLACE_OF_SERVICE,
            serviceLocation
          );
        }) ||
        this.match(
          filterKeys,
          BenefitsNLP.BenefitSummaryFilterType.NETWORK,
          benefit.network.networkCode.description ?? ''
        )
      );
    });
  }

  getModfiedFilter(
    filterType: BenefitsNLP.BenefitSummaryFilterType,
    filterValue: string,
    defaultFilters: BenefitsNLP.BenefitSummaryFilter[]
  ) {
    const modifiedFilter = {
      type: filterType,
      value: filterValue,
      selected: this.match(defaultFilters, filterType, filterValue),
    };
    const key = `${BenefitsNLP.BenefitSummaryFilterType.PLACE_OF_SERVICE}-${filterValue}`;
    const map = new Map();
    return [key, modifiedFilter] as const;
  }

  getTransformedBenefitsListAndFilters(
    benefitSummaryResponseDTO: BenefitsNLP.NlpBenefitsSummarySearchResult,
    defaultFilters: BenefitsNLP.BenefitSummaryFilter[]
  ): BenefitsNLP.BenefitsListAndFilters {
    const filterMap = new Map();
    const transformedBenefitsListAndFilters: BenefitsNLP.BenefitsListAndFilters =
      { benefitsSummaries: [], availableFilters: [] };
    transformedBenefitsListAndFilters.benefitsSummaries =
      benefitSummaryResponseDTO.benefitsSummaries;
    benefitSummaryResponseDTO.benefitsSummaries?.forEach(
      (benefit: BenefitsNLP.NlpBenefitsSummary) => {
        /* Network */
        const [networkFilterKey, networkFilterValue] = this.getModfiedFilter(
          BenefitsNLP.BenefitSummaryFilterType.NETWORK,
          benefit.network.networkCode.description,
          defaultFilters
        );
        filterMap.set(networkFilterKey, networkFilterValue);

        /* Service Location */
        benefit.network.serviceLocations?.forEach((serviceLocation: string) => {
          const [serviceLocationKey, serviceLocationValue] =
            this.getModfiedFilter(
              BenefitsNLP.BenefitSummaryFilterType.PLACE_OF_SERVICE,
              serviceLocation,
              defaultFilters
            );
          filterMap.set(serviceLocationKey, serviceLocationValue);
        });
      }
    );
    transformedBenefitsListAndFilters.availableFilters = [
      ...filterMap.values(),
    ];
    return transformedBenefitsListAndFilters;
  }

  private match(
    filters: BenefitsNLP.BenefitSummaryFilter[],
    targetType: BenefitsNLP.BenefitSummaryFilterType,
    valueToCheck: string
  ) {
    return filters.some((filter: BenefitsNLP.BenefitSummaryFilter) => {
      return (
        filter.type === targetType &&
        valueToCheck.toLowerCase() === filter.value.toLowerCase()
      );
    });
  }
}
