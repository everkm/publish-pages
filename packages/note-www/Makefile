.PHONY: tag
tag:
	@if [ "$(TAG)" != "" ]; then \
		git tag -f $(TAG); \
		git push -f github $(TAG); \
	fi


# @~/.cargo/bin/everkm-publish serve \


define publish_bin
	if [ "$(DEBUG)" == "1" ]; then
		echo "/Users/dayu/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish"; 
	else 
		echo "./node_modules/.bin/everkm-publish"; 
	fi
endef


pick-everkm-publish:
	$(eval EVERKM_PUBLISH_BIN:="$(shell $(call publish_bin))")
	@echo "use daobox bin: $(EVERKM_PUBLISH_BIN)"

serve:
	@RUST_BACKTRACE=0 EVERKM_LOG=info \
		EVERKM_SITE_ASSETS=http://localhost:9082/daobox-assets/0.0.1 \
		EVERKM_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.2 \
		EVERKM_LANG=zh_CN \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish serve \
		--dev-dir ./ \
		--listen=0.0.0.0:9081

work:
	@RUST_BACKTRACE=0 EVERKM_LOG=info \
		EVERKM_SITE_ASSETS=http://localhost:9082/daobox-assets/0.0.1 \
		EVERKM_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.2 \
		EVERKM_LANG=zh_CN \
		~/Coder/yiibox/daobox-server-next/wz-server/target/debug/everkm-publish serve \
		--work-dir ./ \
		--listen=0.0.0.0:9081

export-all: pick-everkm-publish
	@EVERKM_SITE_ASSETS=/assets/daobox-assets/0.0.1 \
		EVERKM_SITE_ASSETS=//assets.daobox.cc/daobox-assets/0.1.2 \
		EVERKM_LANG=zh_CN \
		$(EVERKM_PUBLISH_BIN) serve \
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

dist-theme: fe-build package-theme
	@if [ ! -d theme/dev ]; then mkdir -p theme/dev; fi
	@cp -r dist/* theme/dev/

copy-daobox-assets:
	@if [ ! -d dist/assets ]; then mkdir -p dist/assets; fi
	@cp -r public/daobox-assets dist/assets/


web:
	@./node_modules/.bin/everkm-publish web \
		--work-dir dist

daobox-assets-server:
	@./node_modules/.bin/everkm-publish web \
		--work-dir public --listen 0.0.0.0:9082