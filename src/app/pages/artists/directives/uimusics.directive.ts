import { Directive, ElementRef, HostListener } from '@angular/core';
import { MusicService } from '../../../services/music.service'
declare var $: any;
@Directive({
  selector: '[appUimusics]',

})
export class UimusicsDirective {
  UI: any;
  constructor(private el?: ElementRef, private musicService?: MusicService) {
    var _this = this;
    this.UI = $(this.el.nativeElement);
    this.UI.sortable({
      stop: function (event, ui) {
        var index = ui.item.index();
        var id = ui.item.attr('data-id');
        _this.musicService.updateSort(index, id).subscribe(data => {});
      },
      placeholder: "ui-state-highlight"
    });
    this.UI.disableSelection();
  }

}
