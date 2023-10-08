.PHONY: tag
tag:
	@if [ "$(TAG)" != "" ]; then \
		git tag -f $(TAG); \
		git push -f github $(TAG); \
	fi


# @VITE_RELEASE=prod ~/.cargo/bin/daobox-publish serve \

serve:
	@VITE_RELEASE=prod RUST_BACKTRACE=0 DAOBOX_LOG=info,daobox_publish=debug,tpls=debug \
		DAOBOX_SITE_ASSETS=http://localhost:9082/daobox-assets/0.0.1 \
		DAOBOX_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.0.2 \
		DAOBOX_SITE_ASSETS=http://192.168.31.239:9070 \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/daobox-publish serve \
		--dev-dir ./ \
		--listen=0.0.0.0:9081
work:
	@VITE_RELEASE=prod RUST_BACKTRACE=0 DAOBOX_LOG=info \
		DAOBOX_SITE_ASSETS=http://localhost:9082/daobox-assets/0.0.1 \
		DAOBOX_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.0.2 \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/daobox-publish serve \
		--work-dir ./ \
		--listen=0.0.0.0:9081

export-all:
	@DAOBOX_SITE_ASSETS=/assets/daobox-assets/0.0.1 \
		DAOBOX_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.0 \
		./node_modules/.bin/daobox-publish serve \
		--dev-dir ./ \
		--export

package-theme:
	@RUST_BACKTRACE=1 \
		DAOBOX_LOG=info,img_assets=info \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/daobox-publish package-theme \
		--dev-dir ./ 

fe-dev:
	pnpm run dev

fe-build:
	pnpm run build

dist: fe-build export-all copy-daobox-assets 

dist-theme: fe-build package-theme
	@if [ ! -d theme/dev ]; then mkdir -p theme/dev; fi
	@cp -r dist/* theme/dev/

copy-daobox-assets:
	@if [ ! -d dist/assets ]; then mkdir -p dist/assets; fi
	@cp -r public/daobox-assets dist/assets/


web:
	@./node_modules/.bin/daobox-publish web \
		--work-dir dist

daobox-assets-server:
	@./node_modules/.bin/daobox-publish web \
		--work-dir ~/Coder/www.daobox.cn/packages/daobox-assets/dist --listen 0.0.0.0:9070