.PHONY: tag
tag:
	@if [ "$(TAG)" != "" ]; then \
		git tag -f $(TAG); \
		git push -f github $(TAG); \
	fi

serve:
	@RUST_BACKTRACE=0 DAOBOX_LOG=info \
		DAOBOX_SITE_ASSETS=http://localhost:9082/daobox-assets/0.0.1 \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/daobox-publish serve \
		--dev-dir ./ \
		--listen=0.0.0.0:9081

export-pages:
	@DAOBOX_SITE_ASSETS=/assets/daobox-assets/0.0.1 \
		./node_modules/.bin/daobox-publish serve \
		--dev-dir ./ \
		--export

package-tpls:
	@~/Coder/yiibox/daobox-server-next/wz-server/target/debug/daobox-publish package-tpls \
		--dev-dir ./ \
		--dist-dir ./dist \
		--with-tpls

fe-env-init:
	pnpm i

fe-dev:
	pnpm run dev

fe-build:
	pnpm run build

dist: fe-build export-pages copy-daobox-assets 

dist-tpls: fe-build package-tpls

copy-daobox-assets:
	@if [ ! -d dist/assets ]; then mkdir -p dist/assets; fi
	@if [ -d public/daobox-assets ]; then cp -r public/daobox-assets dist/assets/; fi


web:
	@./node_modules/.bin/daobox-publish web \
		--work-dir dist

daobox-assets-server:
	@./node_modules/.bin/daobox-publish web \
		--work-dir public --listen 0.0.0.0:9082