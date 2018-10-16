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
    }
    if(this.status === 'assigned'){
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#3bc408');
    }
    if(this.status === 'canceled'){
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#f20c0c')
    }
  }

}
