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

work:
	@RUST_BACKTRACE=0 EVERKM_LOG=info \
		EVERKM_SITE_ASSETS=http://localhost:9082/daobox-assets/0.0.1 \
		EVERKM_SITE_ASSETS=//localhost/daobox-assets \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish serve \
		--work-dir ./ \
		--listen=0.0.0.0:9081

export-pages: pick-publish
	@EVERKM_LOG=info \
		EVERKM_SITE_ASSETS=//localhost/daobox-assets \
		EVERKM_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.2 \
		$(PUBLISH_BIN) serve \
		--dev-dir ./ \
		--export

fe-env-init:
	pnpm i

fe-dev:
	pnpm run dev

fe-build:
	pnpm run build

dist: fe-build export-pages copy-daobox-assets 


web:
	@./node_modules/.bin/everkm-publish web \
		--work-dir dist


package-theme:
	@RUST_BACKTRACE=0 \
		EVERKM_LOG=info \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish package-theme \
		--dev-dir ./ 

dist-theme: fe-build package-theme
	@if [ ! -d theme/dev ]; then mkdir -p theme/dev; fi
	@cp -r dist/* theme/dev/

copy-daobox-assets:
	@if [ ! -d dist/assets ]; then mkdir -p dist/assets; fi
	@if [ -d public/daobox-assets ]; then cp -r public/daobox-assets dist/assets/ ; fi


cmd-help-export:
	@~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish help serve > content/post/guide/_ekm_publish-serve.txt      
	@~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish help package-theme > content/post/guide/_ekm_publish-package-theme.txt      