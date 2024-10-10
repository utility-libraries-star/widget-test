import { defaultSettings } from '../constants';
import { WidgetProps } from '../types';

export function getSettings(settings: WidgetProps) {
  return Object.fromEntries(
    Object.entries(defaultSettings).map(([key, value]) => {
      const typedKey = key as keyof WidgetProps;

      return [typedKey, settings?.[typedKey] ? settings[typedKey] : value];
    })
  ) as unknown as WidgetProps;
}
