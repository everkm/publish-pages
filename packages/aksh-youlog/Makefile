.PHONY: tag
tag:
	@if [ "$(TAG)" != "" ]; then \
		git tag -f $(TAG); \
		git push -f github $(TAG); \
	fi



serve:
	@RUST_BACKTRACE=0 EVERKM_LOG=info,daobox_publish=debug,tpls=debug \
		EVERKM_SITE_ASSETS=http://localhost:9082/daobox-assets/0.0.1 \
		EVERKM_SITE_ASSETS=http://192.168.31.239:9070 \
		EVERKM_SITE_ASSETS=//localhost/daobox-assets \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish serve \
		--dev-dir ./ \
		--listen=0.0.0.0:9081
work:
	@RUST_BACKTRACE=0 EVERKM_LOG=info \
		EVERKM_SITE_ASSETS=http://localhost:9082/daobox-assets/0.0.1 \
		EVERKM_SITE_ASSETS=//localhost/daobox-assets \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish serve \
		--work-dir ./ \
		--listen=0.0.0.0:9081

export-all:
	@EVERKM_SITE_ASSETS=/assets/daobox-assets/0.0.1 \
		EVERKM_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.2 \
		./node_modules/.bin/everkm-publish serve \
		--dev-dir ./ \
		--export

export-all-debug:
	@EVERKM_SITE_ASSETS=/assets/daobox-assets/0.0.1 \
		EVERKM_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.2 \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish serve \
		--dev-dir ./ \
		--export

package-theme:
	@RUST_BACKTRACE=1 \
		EVERKM_LOG=info,img_assets=info \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish package-theme \
		--dev-dir ./ 

fe-dev:
	pnpm run dev

fe-build:
	pnpm run build

dist: fe-build export-all copy-daobox-assets 

dist-debug: fe-build export-all-debug copy-daobox-assets 

dist-theme: fe-build package-theme
	@if [ ! -d theme/dev ]; then mkdir -p theme/dev; fi
	@cp -r dist/* theme/dev/

copy-daobox-assets:
	@if [ ! -d dist/assets ]; then mkdir -p dist/assets; fi
	@if [ -d public/daobox-assets ]; then @cp -r public/daobox-assets dist/assets/; fi
	


web:
	@./node_modules/.bin/everkm-publish web \
		--work-dir dist

assets-web:
	@./node_modules/.bin/everkm-publish web \
		--work-dir ~/Coder/www.daobox.cn/packages/daobox-assets/dist --listen 0.0.0.0:9070