export interface AutoComplete{
    Version: number,
    Key: number,
    Type: string,
    Rank: number,
    LocalizedName: string,
    Country: {
      ID: string,
      LocalizedName: string
    },
    AdministrativeArea: {
      ID: string,
      LocalizedName: string
    }
  }