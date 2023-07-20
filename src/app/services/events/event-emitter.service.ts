import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  constructor() { }

  dataEmitter=new EventEmitter<any>();
  raiseDataEmitterEvent(data:any){
    this.dataEmitter.emit(data);
  }
}
