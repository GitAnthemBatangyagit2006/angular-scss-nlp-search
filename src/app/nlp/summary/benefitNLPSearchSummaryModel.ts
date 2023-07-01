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
      filterBenefitSummary: this.filteredBenefitSummary(
        transformedBenefitsListAndFilters.benefitsSummaries,
        transformBenefitSummaryRequest.filterKeys
      ).length
        ? this.filteredBenefitSummary(
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

  filteredBenefitSummary(
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

  getTransformedBenefitsListAndFilters(
    benefitSummaryResponseDTO: BenefitsNLP.NlpBenefitsSummarySearchResult,
    filterKeys: BenefitsNLP.BenefitSummaryFilter[]
  ): BenefitsNLP.BenefitsListAndFilters {
    const filterMap = new Map();
    const transformedBenefitsListAndFilters: BenefitsNLP.BenefitsListAndFilters =
      { benefitsSummaries: [], availableFilters: [] };
    transformedBenefitsListAndFilters.benefitsSummaries =
      benefitSummaryResponseDTO.benefitsSummaries;
    benefitSummaryResponseDTO.benefitsSummaries?.forEach(
      (benefit: BenefitsNLP.NlpBenefitsSummary) => {

        benefit.network.serviceLocations?.forEach((serviceLocation: string) => {
          const serviceLocationFilter = {
            type: BenefitsNLP.BenefitSummaryFilterType.PLACE_OF_SERVICE,
            value: serviceLocation,
            selected: this.match(
              filterKeys,
              BenefitsNLP.BenefitSummaryFilterType.PLACE_OF_SERVICE,
              serviceLocation
            ),
          };
          filterMap.set(
            `${BenefitsNLP.BenefitSummaryFilterType.PLACE_OF_SERVICE}-${serviceLocation}`,
            serviceLocationFilter
          );
        });

        const availableNetworkFilter = {
          type: BenefitsNLP.BenefitSummaryFilterType.NETWORK,
          value: benefit.network.networkCode.description ?? '',
          selected: this.match(
            filterKeys,
            BenefitsNLP.BenefitSummaryFilterType.NETWORK,
            benefit.network.networkCode.description ?? ''
          ),
        };
        filterMap.set(
          `${BenefitsNLP.BenefitSummaryFilterType.NETWORK}-${benefit.network.networkCode.description}`,
          availableNetworkFilter
        );
      }
    );

    console.log('hello', filterMap);
    transformedBenefitsListAndFilters.availableFilters = [...filterMap.values()]
    return transformedBenefitsListAndFilters;
  }

  match(
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
