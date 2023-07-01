import { Injectable } from '@angular/core';
import * as Benefits from './benefit';
import { BenefitsListAndFilters, BenefitSummaryFilter, BenefitSummaryFilterType, BenefitSummarySearchResult, TransformBenefitSummaryRequest } from './benefitNLP';

@Injectable({ providedIn: 'root' })
export class BenefitNLPSearchSummaryModel {
  transformBenefitSummaryToModel(
    transformBenefitSummaryRequest: TransformBenefitSummaryRequest
  ): BenefitSummarySearchResult {
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
    benefitSummarylist: Benefits.NlpBenefitsSummary[],
    selectedFilters: BenefitSummaryFilter[]
  ): Benefits.NlpBenefitsSummary[] {
    if (selectedFilters.length === 0) {
      return benefitSummarylist;
    }
    return benefitSummarylist.filter((benefit) => {
      return (
        benefit.network.serviceLocations.some((serviceLocation: string) => {
          return this.match(
            selectedFilters,
            BenefitSummaryFilterType.PLACE_OF_SERVICE,
            serviceLocation
          );
        }) ||
        this.match(
          selectedFilters,
          BenefitSummaryFilterType.NETWORK,
          benefit.network.networkCode.description ?? ''
        )
      );
    });
  }

  getModfiedFilter(
    filterType: BenefitSummaryFilterType,
    filterValue: string,
    defaultFilters: BenefitSummaryFilter[]
  ) {
    const modifiedFilter = {
      type: filterType,
      value: filterValue,
      selected: this.match(defaultFilters, filterType, filterValue),
    };
    const key = `${BenefitSummaryFilterType.PLACE_OF_SERVICE}-${filterValue}`;
    const map = new Map();
    return [key, modifiedFilter]
  }

  getTransformedBenefitsListAndFilters(
    benefitSummaryResponseDTO: Benefits.NlpBenefitsSummarySearchResult,
    defaultFilters: BenefitSummaryFilter[]
  ): BenefitsListAndFilters {
    const filterMap = new Map();
    const transformedBenefitsListAndFilters: BenefitsListAndFilters =
      { benefitsSummaries: [], availableFilters: [] };
    transformedBenefitsListAndFilters.benefitsSummaries =
      benefitSummaryResponseDTO.benefitsSummaries;
    benefitSummaryResponseDTO.benefitsSummaries?.forEach(
      (benefit: Benefits.NlpBenefitsSummary) => {
        /* Network */
        const [networkFilterKey, networkFilterValue] = this.getModfiedFilter(
          BenefitSummaryFilterType.NETWORK,
          benefit.network.networkCode.description,
          defaultFilters
        );
        filterMap.set(networkFilterKey, networkFilterValue);

        /* Service Location */
        benefit.network.serviceLocations?.forEach((serviceLocation: string) => {
          const [serviceLocationKey, serviceLocationValue] =
            this.getModfiedFilter(
              BenefitSummaryFilterType.PLACE_OF_SERVICE,
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
    filters: BenefitSummaryFilter[],
    targetType: BenefitSummaryFilterType,
    valueToCheck: string
  ) {
    return filters.some((filter: BenefitSummaryFilter) => {
      return (
        filter.type === targetType &&
        valueToCheck.toLowerCase() === filter.value.toLowerCase()
      );
    });
  }
}
