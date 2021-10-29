export interface FetchParam{
  first?: number,
  size?: number,
  organisationId?: string,
  emissionId?: number,
  podcastId?:number,
  iabId?: number,
  participantId?: number,
  query?: string,
  monetisable?: string,
  sort?: string,
  before?: string,
  after?: string,
  noRubriquageId?: Array<number>,
  rubriqueId?:Array<number>,
  rubriquageId?: Array<number>|number,
  status?:Array<string>,
  distributedBy?: string,
  includeHidden?:boolean,
  validity?:boolean,
  publisherId?: string,
  lang?:string,
  start?:string,
  end?:string,
  interval?: string,
  tzId?: string,
  role?: string,
  includeNotValid?: boolean,
  type?: string,
  listening?: string,
  top?: number,
}