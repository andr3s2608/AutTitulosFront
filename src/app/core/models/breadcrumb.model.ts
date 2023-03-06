/**
 * Interface que moldea un objeto de la miga de pan
 */
export interface Breadcrumb {
  label: string;
  url: string | null;
  activate?: boolean;
}
