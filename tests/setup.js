import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Fix for TimeoutNaNWarning: NaN is not a number in JSDOM
// This happens when react-bootstrap/dom-helpers tries to parse transition duration
const originalSetTimeout = globalThis.setTimeout;
globalThis.setTimeout = (handler, timeout, ...args) => {
  return originalSetTimeout(handler, isNaN(timeout) ? 0 : timeout, ...args);
};

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
})