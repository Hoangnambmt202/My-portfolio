// global.d.ts
import "react";

declare module "react" {
  interface CSSProperties {
    "--accent-color"?: string;
    "--accent-bg"?: string;
    "--accent-border"?: string;
    "--accent-shadow"?: string;
  }
}
