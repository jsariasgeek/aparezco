import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector:'[resaltarStatus]'
})
export class ResaltarStatusDirective implements OnInit {

  constructor(private elRef:ElementRef, private renderer:Renderer2) {}

  @Input('resaltarStatus') status:string = '';

  ngOnInit(){
    if(this.status === 'finished'){
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#f2a50c');
      this.renderer.setStyle(this.elRef.nativeElement, 'color', '#f2a50c');
    }
    if(this.status === 'assignedWorking'){
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#3bc408');
      this.renderer.setStyle(this.elRef.nativeElement, 'color', '#3bc408');
    }
    if(this.status === 'assignedOpen'){
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#218ac7');
      this.renderer.setStyle(this.elRef.nativeElement, 'color', '#218ac7');
    }

    if(this.status === 'canceled'){
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#f20c0c');
      this.renderer.setStyle(this.elRef.nativeElement, 'color', '#f20c0c');
    }
  }

}


