import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  Conectado = false;
  constructor(private network: Network) { }
  estado() {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      setTimeout(() => { 
        if (this.network.type === 'wifi' ||
            this.network.type === 'cell_2G' ||
            this.network.type === 'cell_3G' ||
            this.network.type === 'cell_4G' ||
            this.network.type === 'cell'
        ) {
          this.Conectado = true;
        } else {
          this.Conectado = false;
        }
        
        
    }, 2000);
  });
  connectSubscription.unsubscribe();
  return this.Conectado;
  }
  
}
