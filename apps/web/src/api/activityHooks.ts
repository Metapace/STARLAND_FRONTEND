import { useQuery, useMutation } from '@tanstack/react-query';
import { getCountryList, getLanguageList, getChanList, createMaterial } from 'src/api/activity';

/**
 *
 * @description 获取国家
 */
const useRequestCountry = (ty: 1 | 2) => useQuery([`country${ty}`], () => getCountryList({ ty }));

/**
 *
 * @description 获取语言
 */
const useRequestLanguage = (ty: 1 | 2) => useQuery([`language${ty}`], () => getLanguageList({ ty }));

/**
 *
 * @description  获取渠道列表
 */
const useRequestChanne = () => useQuery(['Chan'], () => getChanList());

const useMutationCreateMaterial = () =>
  useMutation({
    mutationFn: createMaterial,
  });

export { useRequestCountry, useRequestLanguage, useRequestChanne, useMutationCreateMaterial };
