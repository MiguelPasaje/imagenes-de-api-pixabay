import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(
    private http:HttpClient
  ) { }

  setError(mensaje:string){
    this.error$.next(mensaje)
  }

  getError():Observable<string>{
    return this.error$.asObservable()

  }

  enviarTerminoBusqueda(termino:string){
    this.terminoBusqueda$.next(termino)
  }

  getTerminoBusqueda(): Observable<string>{
    return this.terminoBusqueda$.asObservable()
  }

  getImagenes(termino:string):Observable<any>{
    const URL = `https://pixabay.com/api/?key=39690374-cd4f22f77eb42e3de66277c9b&q=${termino}`
    return this.http.get(URL)
  }
}
