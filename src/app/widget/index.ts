import { WidgetProps } from './types';
import { createRoot } from 'react-dom/client';
import { Widget } from './Widget';

export function createWidget(container: HTMLElement, settings: WidgetProps) {
  const root = createRoot(container);
  root.render(Widget({ settings }));
}
