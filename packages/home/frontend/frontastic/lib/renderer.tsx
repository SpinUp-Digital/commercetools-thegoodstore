import React from 'react';
import cx from 'classnames';
import { InstantSearchServerState } from 'react-instantsearch-hooks';
import { Category } from 'shared/types/product/Category';
import { Cell as LayoutElement } from './cell';
import { highlightClassNames, TasticWrapper } from './component';
import { Errors } from './errors';
import { Grid } from './grid';
import { Cell as LayoutElementType, Tastic, TasticRegistry, CellConfiguration, PagePreviewDataResponse } from './types';

export function FrontasticRenderer({
  data,
  tastics = {},
  gridClassName,
  currentHighlight,
}: {
  data: PagePreviewDataResponse & {
    categories: { items: Category[] };
    serverState?: InstantSearchServerState;
    serverUrl: string;
  };
  tastics: TasticRegistry;
  gridClassName?: string;
  wrapperClassName?: string;
  currentHighlight?: string;
}) {
  function deviceVisibility(conf: CellConfiguration) {
    return `${conf.mobile ? 'block' : 'hidden'} ${conf.tablet ? 'md:block' : 'md:hidden'} ${
      conf.desktop ? 'lg:block' : 'lg:hidden'
    }`;
  }

  return (
    <div className="flex min-h-[calc(100vh-138px)] flex-col items-stretch justify-start">
      {process && process.env.NODE_ENV !== 'production' && <Errors />}
      <Grid wrapperClassName="w-full">
        {data?.page?.sections?.kit?.layoutElements.map((layoutElement: LayoutElementType) => (
          <LayoutElement
            size={layoutElement.configuration.size}
            className={highlightClassNames(currentHighlight === layoutElement.layoutElementId)}
            key={layoutElement.layoutElementId}
          >
            {layoutElement.tastics.map((t) => (
              <TasticWrapper
                tastics={tastics}
                key={t.tasticId}
                data={t}
                categories={data.categories.items ?? []}
                dataSources={data.data.dataSources}
                pageFolder={data.pageFolder}
                highlight={currentHighlight === t.tasticId}
                previewId={data?.previewId}
                serverUrl={data.serverUrl}
                serverState={data.serverState}
              />
            ))}
          </LayoutElement>
        ))}
      </Grid>
      <Grid
        gridClassName={gridClassName}
        wrapperClassName={`w-full ${highlightClassNames(currentHighlight === 'head')}`}
      >
        {data?.page?.sections?.head?.layoutElements.map((layoutElement: LayoutElementType) => (
          <LayoutElement
            size={layoutElement.configuration.size}
            className={cx(
              highlightClassNames(currentHighlight === layoutElement.layoutElementId),
              deviceVisibility(layoutElement.configuration),
            )}
            key={layoutElement.layoutElementId}
          >
            {layoutElement.tastics.map((t) => (
              <TasticWrapper
                tastics={tastics}
                key={t.tasticId}
                data={t}
                categories={data.categories.items ?? []}
                dataSources={data.data.dataSources}
                pageFolder={data.pageFolder}
                highlight={currentHighlight === t.tasticId}
                serverUrl={data.serverUrl}
                serverState={data.serverState}
              />
            ))}
          </LayoutElement>
        ))}
      </Grid>
      <Grid
        gridClassName={gridClassName}
        wrapperClassName={`w-full grow ${highlightClassNames(currentHighlight === 'main')}`}
      >
        {data?.page?.sections?.main?.layoutElements.map((layoutElement: LayoutElementType) => (
          <LayoutElement
            size={layoutElement.configuration.size}
            className={cx(
              highlightClassNames(currentHighlight === layoutElement.layoutElementId),
              deviceVisibility(layoutElement.configuration),
            )}
            key={layoutElement.layoutElementId}
          >
            {layoutElement.tastics.map((t: Tastic) => (
              <TasticWrapper
                tastics={tastics}
                key={t.tasticId}
                data={t}
                categories={data.categories.items ?? []}
                dataSources={data.data.dataSources}
                pageFolder={data.pageFolder}
                highlight={currentHighlight === t.tasticId}
                serverUrl={data.serverUrl}
                serverState={data.serverState}
              />
            ))}
          </LayoutElement>
        ))}
      </Grid>
      <Grid
        gridClassName={gridClassName}
        wrapperClassName={`w-full ${highlightClassNames(currentHighlight === 'footer')}`}
      >
        {data?.page?.sections?.footer?.layoutElements.map((layoutElement: LayoutElementType) => (
          <LayoutElement
            size={layoutElement.configuration.size}
            className={cx(
              highlightClassNames(currentHighlight === layoutElement.layoutElementId),
              deviceVisibility(layoutElement.configuration),
            )}
            key={layoutElement.layoutElementId}
          >
            {layoutElement.tastics.map((t: Tastic) => (
              <TasticWrapper
                tastics={tastics}
                key={t.tasticId}
                data={t}
                categories={data.categories.items ?? []}
                dataSources={data.data.dataSources}
                pageFolder={data.pageFolder}
                highlight={currentHighlight === t.tasticId}
                serverUrl={data.serverUrl}
                serverState={data.serverState}
              />
            ))}
          </LayoutElement>
        ))}
      </Grid>
    </div>
  );
}
