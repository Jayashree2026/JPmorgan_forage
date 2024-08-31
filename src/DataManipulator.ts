import { ServerRespond } from './DataStreamer';

export interface Row {
  //updated to new schema according to the changes made in schema of Graph.tsx file.
  price_abc:number,
  price_def:number,
  ratio:number,
  trigger_alert:number | undefined,
  upper_bound: number,
  lower_bound: number,
  timestamp: Date,
}


export class DataManipulator {
  //updating the generaterow function according to the new schema.
  static generateRow(serverRespond: ServerRespond[]):Row {
    const priceABC=(serverRespond[0].top_ask.price+serverRespond[0].top_bid.price)/2;
    const priceDEF=(serverRespond[1].top_ask.price+serverRespond[1].top_bid.price)/2;
    const ratio=priceABC/priceDEF;
    const upperbound=1+0.05;
    const lowerbound=1+0.05;
    return {
      price_abc:priceABC,
      price_def:priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp>serverRespond[1].timestamp?serverRespond[0].timestamp:serverRespond[1].timestamp,
      trigger_alert:(ratio>upperbound||ratio<lowerbound)?ratio:undefined,
      upper_bound: upperbound,
      lower_bound: lowerbound,
      
    };
  }
}
