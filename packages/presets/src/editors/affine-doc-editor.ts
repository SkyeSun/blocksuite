import '../fragments/doc-title/doc-title';
import '../fragments/page-meta-tags/page-meta-tags';

import { DocEditorBlockSpecs } from '@blocksuite/blocks';
import { noop } from '@blocksuite/global/utils';
import { ShadowlessElement, WithDisposable } from '@blocksuite/lit';
import type { Page } from '@blocksuite/store';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { DocTitle } from '../fragments/doc-title/doc-title.js';
import { PageMetaTags } from '../fragments/page-meta-tags/page-meta-tags.js';
import { DocEditor } from './doc-editor.js';

noop(DocTitle);
noop(PageMetaTags);
noop(DocEditor);

@customElement('affine-doc-editor')
export class AffineDocEditor extends WithDisposable(ShadowlessElement) {
  @property({ attribute: false })
  page!: Page;

  @property({ attribute: false })
  specs = DocEditorBlockSpecs;

  override render() {
    return html`
      <style>
        affine-doc-editor {
          display: block;
          height: 100%;
          overflow: hidden;
          font-family: var(--affine-font-family);
          background: var(--affine-background-primary-color);
        }

        affine-doc-editor * {
          box-sizing: border-box;
        }

        @media print {
          affine-doc-editor {
            height: auto;
          }
        }

        .affine-doc-viewport {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          user-select: none;
        }

        doc-editor {
          flex-grow: 1;
        }
      </style>
      <div class="affine-doc-viewport">
        <doc-title .page=${this.page}></doc-title>
        <page-meta-tags .page=${this.page}></page-meta-tags>
        <doc-editor
          .page=${this.page}
          .specs=${this.specs}
          .hasViewport=${false}
        ></doc-editor>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-doc-editor': AffineDocEditor;
  }
}