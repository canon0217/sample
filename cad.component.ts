import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, SceneLoader, StandardMaterial, Color3, Texture } from '@babylonjs/core';
import "@babylonjs/loaders";

@Component({
  selector: 'app-cad',
  templateUrl: './cad.component.html',
  styleUrls: ['./cad.component.scss']
})
export class CadComponent implements OnInit, AfterViewInit {
  rotAmount: Array<number> = [];
  input: Array<number> = [];
  currentPos: Array<number> = [];
  inputVal: number;

  constructor() { }

  ngOnInit(): void {
    this.initializeParams();
  }

  ngAfterViewInit(): void {
    const canvas = document.getElementById('half_cylinder') as HTMLCanvasElement;
    const engine = new Engine(canvas, true);

    const scene = this.createScene(canvas, engine);
    engine.runRenderLoop(() => {
      this.updateRot();
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });
  }

  getInputValue(): void {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const inputVal = this.inputVal * 2 * 3.141592 / 360;
        this.input[row * 8 + column] = inputVal;
      }
    }
  }

  private initializeParams(): void {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        this.rotAmount[row * 8 + column] = 0;
        this.input[row * 8 + column] = 0;
        this.currentPos[row * 8 + column] = 0;      
      }
    }
    this.inputVal = 0;
  }

  private createScene(canvas: HTMLCanvasElement, engine: Engine): Scene {
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        SceneLoader.ImportMeshAsync("", "../../assets/source/", 'half_cylinder.glb')
          .then((result) => {
            result.meshes[0].translate (
            new Vector3((200 * row - 800), 0, (200 * column - 800)),
            0.01,
          );
          
          scene.registerAfterRender(() => {
            result.meshes[0].rotate (
              new Vector3(0, 1, 0),
              this.rotAmount[row * 8 + column],
            );
          });
        });
      }
    } 

    return scene;
  }

  private updateRot(): void {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const rotAmount = this.input[row * 8 + column] - this.currentPos[row * 8 + column];
        this.rotAmount[row * 8 + column] = rotAmount;
        if (360 < this.input[row * 8 + column]) {
          this.input[row * 8 + column] -= 360;
        }
        this.currentPos[row * 8 + column] = this.input[row * 8 + column];
      }
    }
  }
}
