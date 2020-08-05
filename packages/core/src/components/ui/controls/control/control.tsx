import {
  h, Host, Component, Prop, State, Element,
  Event, EventEmitter,
  Watch,
} from '@stencil/core';
import { openPlayerWormhole } from '../../../core/player/PlayerWormhole';
import { PlayerProp, PlayerProps } from '../../../core/player/PlayerProp';
import { isNull, isUndefined } from '../../../../utils/unit';
import { Disposal } from '../../../core/player/Disposal';
import { listen } from '../../../../utils/dom';
import { KeyboardControl } from './KeyboardControl';
import { findRootPlayer } from '../../../core/player/utils';

/**
 * @slot - Used to pass in the content of the control (text/icon/tooltip).
 */
@Component({
  tag: 'vime-control',
  styleUrl: 'control.scss',
})
export class Control implements KeyboardControl {
  private button!: HTMLButtonElement;

  private keyboardDisposal = new Disposal();

  @Element() el!: HTMLVimeControlElement;

  @State() describedBy?: string;

  @State() tapHighlight = false;

  /**
   * @inheritdoc
   */
  @Prop() keyCodes?: string;

  @Watch('keyCodes')
  onKeyCodesChange() {
    this.keyboardDisposal.empty();
    if (isUndefined(this.keyCodes)) return;

    const player = findRootPlayer(this);
    const codes = (this.keyCodes! as string).split('|').map((code) => parseInt(code, 10));

    this.keyboardDisposal.add(listen(player, 'keydown', (event: Event) => {
      const { keyCode } = event as KeyboardEvent;
      const match = (codes as number[]).includes(keyCode);
      if (match) { this.button.click(); }
    }));
  }

  /**
   * Whether the control should be displayed or not.
   */
  @Prop() hidden = false;

  /**
   * The `aria-label` property of the control.
   */
  @Prop() label!: string;

  /**
   * If the control has a popup menu, then this should be the `id` of said menu. Sets the
   * `aria-controls` property.
   */
  @Prop() menu?: string;

  /**
   * If the control has a popup menu, this indicates whether the menu is open or not. Sets the
   * `aria-expanded` property.
   */
  @Prop() expanded?: boolean;

  /**
   * Scale the size of the control up/down by the amount given.
   */
  @Prop() scale = 1;

  /**
   * @internal
   */
  @Prop() isTouch: PlayerProps[PlayerProp.IsTouch] = false;

  /**
   * Emitted when the user is interacting with the control by focusing, touching or hovering on it.
   */
  @Event() interactionChange!: EventEmitter<boolean>;

  connectedCallback() {
    this.findTooltip();
    this.onKeyCodesChange();
  }

  disconnectedCallback() {
    this.keyboardDisposal.empty();
  }

  private onTouchStart() {
    this.tapHighlight = true;
    window.requestAnimationFrame(() => {
      setTimeout(() => { this.tapHighlight = false; }, 100);
    });
  }

  private findTooltip() {
    const tooltip = this.el.querySelector('vime-tooltip');
    if (!isNull(tooltip)) this.describedBy = tooltip!.id;
    return tooltip;
  }

  private onShowTooltip() {
    const tooltip = this.findTooltip();
    if (!isNull(tooltip)) tooltip!.active = true;
    this.interactionChange.emit(true);
  }

  private onHideTooltip() {
    const tooltip = this.findTooltip();
    if (!isNull(tooltip)) tooltip!.active = false;
    this.button.blur();
    this.interactionChange.emit(false);
  }

  private onFocus() {
    this.el.dispatchEvent(new window.Event('focus', { bubbles: true }));
    this.onShowTooltip();
  }

  private onBlur() {
    this.el.dispatchEvent(new window.Event('blur', { bubbles: true }));
    this.onHideTooltip();
  }

  private onMouseEnter() {
    this.onShowTooltip();
  }

  private onMouseLeave() {
    this.onHideTooltip();
  }

  render() {
    return (
      <Host
        class={{
          hidden: this.hidden,
        }}
      >
        <button
          type="button"
          style={{
            transform: `scale(${this.scale})`,
          }}
          class={{
            notTouch: !this.isTouch,
            tapHighlight: this.tapHighlight,
          }}
          aria-label={this.label}
          aria-haspopup={!isUndefined(this.menu)}
          aria-controls={this.menu}
          aria-expanded={!isUndefined(this.menu) ? (this.expanded ?? false) : undefined}
          aria-hidden={this.hidden ? 'true' : 'false'}
          aria-describedby={this.describedBy}
          onTouchStart={this.onTouchStart.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
          ref={(el: any) => { this.button = el; }}
        >
          <slot />
        </button>
      </Host>
    );
  }
}

openPlayerWormhole(Control, [
  PlayerProp.IsTouch,
]);
