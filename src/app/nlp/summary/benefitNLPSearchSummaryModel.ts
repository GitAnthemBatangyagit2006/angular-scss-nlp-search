import { Injectable } from '@angular/core';
import {
  BenefitResult,
  BenefitsListAndFilters,
  BenefitSummary,
  BenefitSummaryFilter,
  BenefitSummaryFilterNetwork,
  BenefitSummaryFilterType,
  BenefitSummaryResponseDTO,
  BenefitSummarySearchResult,
  Categories,
  ServiceCategory,
  Services,
} from './benefitNLP';

export const transformBenefitSummaryToModel = (
  benefitSummaryResponseDTO: BenefitSummaryResponseDTO,
  contractUid: string,
  effectiveDt: string,
  filterKeys: BenefitSummaryFilter[]
): BenefitSummarySearchResult | undefined => {
  const transformedBenefitsListAndFilters =
    getTransformemBenefitsListAndFilters(benefitSummaryResponseDTO);
  return {
    contractUid: contractUid,
    dateOfServicepPlanType: effectiveDt,
    benefitSummary: transformedBenefitsListAndFilters.benefitSummaryList,
    filterBenefitSummary: filteredBenefitSummary(
      transformedBenefitsListAndFilters.benefitSummaryList,
      filterKeys
    ).length
      ? filteredBenefitSummary(
          transformedBenefitsListAndFilters.benefitSummaryList,
          filterKeys
        )
      : transformedBenefitsListAndFilters.benefitSummaryList,
    filters: [
      ...new Map(
        transformedBenefitsListAndFilters.availableFilters.map((item) => [
          item['value'],
          item,
        ])
      ).values(),
    ],
    benefitAssociatedDetails: {
      benefitId: '',
      planType: '',
    },
  };
};

export const filteredBenefitSummary = (
  benefitSummarylist: BenefitSummary[],
  filterKeys: BenefitSummaryFilter[]
): BenefitSummary[] => {
  return benefitSummarylist.filter((benefit) => {
    return (
      benefit.placeOfService.some((placeOfService) => {
        return match(
          filterKeys,
          BenefitSummaryFilterType.PLACE_OF_SERVICE,
          placeOfService
        );
      }) || match(filterKeys, BenefitSummaryFilterType.NETWORK, benefit.network)
    );
  });
};

export const getTransformemBenefitsListAndFilters = (
  benefitSummaryResponseDTO: BenefitSummaryResponseDTO
): BenefitsListAndFilters => {
  const filters = new Set<BenefitSummaryFilter>();
  const transformedBenefitsListAndFilters: BenefitsListAndFilters = {
    benefitSummaryList: [],
    availableFilters: [],
  };
  (benefitSummaryResponseDTO.benefitResults || []).forEach(
    (benefitResult: BenefitResult) => {
      benefitResult.serviceCategory?.forEach(
        (serviceCategory: ServiceCategory) => {
          const benefitModel: BenefitSummary = {
            documentId: '',
            planType: '',
            benefitSystemId: '',
            benefitName: '',
            placeOfService: [],
            benefitDescription: '',
            network: BenefitSummaryFilterNetwork.IN_NETWORK,
            coPayment: '',
            coInsurance: '',
            deductibleApplies: false,
            priorAuthorization: false,
          };
          serviceCategory?.categories?.forEach((category: Categories) => {
            category?.services?.forEach((service: Services) => {
              service?.benefit?.forEach((benefit) => {
                benefitModel.benefitName =
                  benefit.benefitNm ?? benefit.serviceNm ?? '';
                benefit?.situations?.forEach((situation) => {
                  // Reset array
                  benefitModel.placeOfService = [];
                  situation.pos?.forEach((pos) => {
                    filters.add({
                      type: BenefitSummaryFilterType.PLACE_OF_SERVICE,
                      value: pos.posDesc,
                    });
                    benefitModel.placeOfService.push(pos.posDesc);
                  });
                  situation.networks?.forEach((network) => {
                    filters.add({
                      type: BenefitSummaryFilterType.NETWORK,
                      value: network.type,
                    });
                    benefitModel.priorAuthorization =
                      network.precertRequired === 'Y' ? true : false;
                    benefitModel.deductibleApplies =
                      network.deductibleApplies === 'Yes' ? true : false;
                    benefitModel.network = network.type;
                    transformedBenefitsListAndFilters.benefitSummaryList.push({
                      ...benefitModel,
                    });
                  });
                });
              });
            });
          });
        }
      );
    }
  );
  transformedBenefitsListAndFilters.availableFilters =
    Array.from<BenefitSummaryFilter>(filters).map((item) => item);
  return transformedBenefitsListAndFilters;
};

export function match(
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