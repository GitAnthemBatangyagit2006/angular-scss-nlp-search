import { Injectable } from '@angular/core';
import * as Benefits from './benefitNLP';

@Injectable({ providedIn: 'root' })
export class BenefitNLPSearchSummaryModel {
  transformBenefitSummaryToModel(
    transformBenefitSummaryRequest: Benefits.TransformBenefitSummaryRequest
  ): Benefits.BenefitSummarySearchResult {
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
    selectedFilters: Benefits.BenefitSummaryFilter[]
  ): Benefits.NlpBenefitsSummary[] {
    if (selectedFilters.length === 0) {
      return benefitSummarylist;
    }
    return benefitSummarylist.filter((benefit) => {
      return (
        benefit.network.serviceLocations.some((serviceLocation: string) => {
          return this.match(
            selectedFilters,
            Benefits.BenefitSummaryFilterType.PLACE_OF_SERVICE,
            serviceLocation
          );
        }) ||
        this.match(
          selectedFilters,
          Benefits.BenefitSummaryFilterType.NETWORK,
          benefit.network.networkCode.description ?? ''
        )
      );
    });
  }

  getModfiedFilter(
    filterType: Benefits.BenefitSummaryFilterType,
    filterValue: string,
    defaultFilters: Benefits.BenefitSummaryFilter[]
  ) {
    const modifiedFilter = {
      type: filterType,
      value: filterValue,
      selected: this.match(defaultFilters, filterType, filterValue),
    };
    const key = `${Benefits.BenefitSummaryFilterType.PLACE_OF_SERVICE}-${filterValue}`;
    const map = new Map();
    return [key, modifiedFilter] as const;
  }

  getTransformedBenefitsListAndFilters(
    benefitSummaryResponseDTO: Benefits.NlpBenefitsSummarySearchResult,
    defaultFilters: Benefits.BenefitSummaryFilter[]
  ): Benefits.BenefitsListAndFilters {
    const filterMap = new Map();
    const transformedBenefitsListAndFilters: Benefits.BenefitsListAndFilters =
      { benefitsSummaries: [], availableFilters: [] };
    transformedBenefitsListAndFilters.benefitsSummaries =
      benefitSummaryResponseDTO.benefitsSummaries;
    benefitSummaryResponseDTO.benefitsSummaries?.forEach(
      (benefit: Benefits.NlpBenefitsSummary) => {
        /* Network */
        const [networkFilterKey, networkFilterValue] = this.getModfiedFilter(
          Benefits.BenefitSummaryFilterType.NETWORK,
          benefit.network.networkCode.description,
          defaultFilters
        );
        filterMap.set(networkFilterKey, networkFilterValue);

        /* Service Location */
        benefit.network.serviceLocations?.forEach((serviceLocation: string) => {
          const [serviceLocationKey, serviceLocationValue] =
            this.getModfiedFilter(
              Benefits.BenefitSummaryFilterType.PLACE_OF_SERVICE,
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
    filters: Benefits.BenefitSummaryFilter[],
    targetType: Benefits.BenefitSummaryFilterType,
    valueToCheck: string
  ) {
    return filters.some((filter: Benefits.BenefitSummaryFilter) => {
      return (
        filter.type === targetType &&
        valueToCheck.toLowerCase() === filter.value.toLowerCase()
      );
    });
  }
}
