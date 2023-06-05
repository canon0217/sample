import { Component, OnInit, AfterViewInit } from '@angular/core';
import { sieve } from '../../../pkg/ng_babylon_template_master';

@Component({
  selector: 'app-wasm',
  templateUrl: './wasm.component.html',
  styleUrls: ['./wasm.component.scss']
})
export class WasmComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startfunc();
  }

  private startfunc(): void {
    const n = 10000;
    setInterval(() => {
      this.sieve(n),
      10000
    });
  }

  private sieve(n: number): void {
    const result = sieve(n);
    console.log(result);
  }

}
