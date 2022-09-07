import { readable, writable, type Writable } from 'svelte/store';
import type D3 from './3d';

// day/night

export const daynight = writable<string>(localStorage.getItem('daynight') || '')
daynight.subscribe(up => up ? localStorage.setItem('daynight', up) : localStorage.removeItem('daynight'))

// messages

export const messages = new class {
  live: Writable<[string, 'e' | 'i'][]>
  constructor() {
    this.live = writable<[string, 'e' | 'i'][]>([])
  }
  set(...arg: [string, 'e' | 'i'][]) {
    this.live.update(up => [...arg, ...up])
  }
  remove(arg: string) {
    this.live.update(up => up.filter((item) => item[0] !== arg))
  }
}

// 3D

export const d3 = writable<D3>()

export const default3DWorld = readable<Parameters<D3["update"]>[0]>({ bot: { intoViewOffset: 10 }, mannequin: {}, })

// pitch

export const pitch = writable<number>((+localStorage.getItem('pitch')))
pitch.subscribe(up => localStorage.setItem('pitch', '' + up))

// hash

export const hash = new class {

  live: Writable<Map<string, string>>

  constructor() {
    window.onpopstate = () => this.live.set(this.hashToMap());
    this.defaultOpen()
    this.live = writable<Map<string, string>>(this.hashToMap())
  }

  set = (...arg: [string, string?][]) => {
    this.live.update((map) => {
      arg.forEach(([key, value]) => map.set(key, value))

      this.mapToHash(map);
      return map;
    })
  }

  delete = (key: string) => {
    this.live.update((map) => {
      map.delete(key);
      this.mapToHash(map);
      return map;
    });
  }

  private hashToMap = (): Map<string, string> => new Map([
    ...<[]>(location.hash.substring(1).split('&').filter(v => v).map(item => item.split('=')))
  ])

  private mapToHash = (map: Map<string, string>) => {
    const array = [...map]
    const hash = array.map(item => item[1] ? item.join('=') : item[0]).join('&')
    history.pushState(
      null,
      "",
      location.origin +
      location.pathname +
      "#" +
      hash
    )
  }

  private defaultOpen = () => {
    this.mapToHash(new Map(
      ([['about', true], ['book', false]] as [string, boolean][])
        .filter(item => JSON.parse(localStorage.getItem(item[0] + "_view") || '' + item[1]) === true)
        .map(item => [item[0], ''])
    ))
  }

}
