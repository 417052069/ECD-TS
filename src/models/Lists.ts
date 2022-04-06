interface Lists {
  /*    {"id":1,"type":"自建","projectName":"如东","detail1":"前期准备","detail2":"初步设计","detail3":"招标","detail4":"施工","detail5":"竣工验收","detail6":"竣工结算","detail7":"项目运营","detail8":"备注"}, */
  id: number,
  projectName: string,
  type: string,
  changerA: string,
  changerB: string,
  detail1: string,
  status1: boolean,
  detail2: string,
  status2: boolean,
  detail3: string,
  status3: boolean,
  detail4: string,
  status4: boolean,
  detail5: string,
  status5: boolean,
  detail6: string,
  status6: boolean,
  detail7: string,
  status7: boolean,
  detail8: string,
  status8: boolean,
  status: boolean,
  isFav: boolean
}

export default Lists
