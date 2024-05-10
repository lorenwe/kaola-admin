import { IApi } from '@umijs/max';

export default (api: IApi) => {
  console.log("执行 plugin.ts")
  api.modifyHTML(($) => {
    $('head').append([
      `<link rel="icon" href="/favicon.ico" type="image/x-icon" />`
    ])
    return $;
  });
  // api.addHTMLMetas(() => [{ name: 'foo', content: 'bar' }]);
  // api.addHTMLLinks(() => [{ rel: 'foo', content: 'bar' }]);
  // api.addHTMLStyles(() => [`body { color: red; }`]);
  // api.addHTMLHeadScripts(() => [`console.log('hello world from head')`]);
  // api.addHTMLScripts(() => [`console.log('hello world')`]);
  // api.addEntryCodeAhead(() => [`console.log('entry code ahead')`]);
  // api.addEntryCode(() => [`console.log('entry code')`]);
  // api.onDevCompileDone((opts) => {
  //   opts;
  //   // console.log('> onDevCompileDone', opts.isFirstCompile);
  // });
  // api.onBuildComplete((opts) => {
  //   opts;
  //   // console.log('> onBuildComplete', opts.isFirstCompile);
  // });
  // api.chainWebpack((memo) => {
  //   memo;
  // });
  // api.onStart(() => {});
  // api.onCheckCode((args) => {
  //   args;
  //   // console.log('> onCheckCode', args);
  // });
};