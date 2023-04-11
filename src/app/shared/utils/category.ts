export class Category {
  id?: number;
  logo?: string;
  logos3?: string;
  name?: string | any;
  update_logo?: string;
  alias_name?: string;
}

export class Response {
  data?: any;
  errorMessage?: string;
  filter?: { page: number; page_size: number };
  isLoading!: boolean;
}
