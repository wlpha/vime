import { h, Component, Prop } from '@stencil/core';
import { withPlayerContext } from '../../../core/player/PlayerContext';
import { PlayerProp, PlayerProps } from '../../../core/player/PlayerProp';

@Component({
  tag: 'vime-current-time',
})
export class CurrentTime {
  /**
   * @internal
   */
  @Prop() currentTime: PlayerProps[PlayerProp.currentTime] = 0;

  /**
   * @internal
   */
  @Prop() i18n: PlayerProps[PlayerProp.i18n] = {};

  /**
   * Whether the time should always show the hours unit, even if the time is less than
   * 1 hour (eg: `20:35` -> `00:20:35`).
   */
  @Prop() alwaysShowHours = false;

  render() {
    return (
      <vime-time
        label={this.i18n.currentTime}
        seconds={this.currentTime}
        alwaysShowHours={this.alwaysShowHours}
      />
    );
  }
}

withPlayerContext(CurrentTime, [
  PlayerProp.currentTime,
  PlayerProp.i18n,
]);
