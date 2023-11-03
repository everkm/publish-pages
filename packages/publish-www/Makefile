.PHONY: tag
tag:
	@if [ "$(TAG)" != "" ]; then \
		git tag -f $(TAG); \
		git push -f github $(TAG); \
	fi

define publish_bin
	if [ "$(DEBUG)" == "1" ]; then
		echo "/Users/dayu/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish"; 
	else 
		echo "./node_modules/.bin/everkm-publish"; 
	fi
endef

pick-publish:
	$(eval PUBLISH_BIN:="$(shell $(call publish_bin))")
	@echo "use daobox bin: $(PUBLISH_BIN)"

	
serve:
	@RUST_BACKTRACE=0 EVERKM_LOG=info \
		EVERKM_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.2 \
		EVERKM_SITE_ASSETS=//localhost/daobox-assets \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish serve \
		--dev-dir ./ \
		--listen=0.0.0.0:9081

export-pages: pick-publish
	@EVERKM_LOG=info \
		EVERKM_SITE_ASSETS=//localhost/daobox-assets \
		EVERKM_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.2 \
		$(PUBLISH_BIN) serve \
		--dev-dir ./ \
		--export

package-tpls:
	@~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish package-tpls \
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
	@./node_modules/.bin/everkm-publish web \
		--work-dir dist

daobox-assets-server:
	@./node_modules/.bin/everkm-publish web \
		--work-dir public --listen 0.0.0.0:9082