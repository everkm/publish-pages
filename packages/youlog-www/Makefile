ifneq (, $(shell echo $$DEBUG))
  EKMP = $(shell which everkm-publish)
else
  EKMP = ./node_modules/.bin/everkm-publish
endif


.PHONY: tag
tag:
	@if [ "$(TAG)" != "" ]; then \
		git tag -f $(TAG); \
		git push -f origin $(TAG); \
	fi

	
dev:
	@echo use ekmp $(EKMP)
	@EVERKM_LOG=info \
		$(EKMP) serve \
		--dev-dir ./ \
		--listen=0.0.0.0:9081

work:
	@EVERKM_LOG=info \
		$(EKMP) serve \
		--work-dir ./ \
		--listen=0.0.0.0:9081

build-pages:
	@EVERKM_LOG=info \
		$(EKMP) serve \
		--dev-dir ./ \
		--export

fe-env-init:
	pnpm i

fe-dev:
	pnpm run dev

fe-build:
	pnpm run build

dist: fe-build build-pages

sync-config:
	@cp everkm-theme.yaml content/post/_everkm-theme.inc.yaml


preview:
	@$(EKMP) web \
		--work-dir dist


package-theme:
	@echo $(EKMP)
	@EVERKM_LOG=info \
		$(EKMP) theme pack \
		--dev-dir ./ 


dist-theme: fe-build package-theme
	@if [ ! -d theme/dev ]; then mkdir -p theme/dev; fi
	@if [ -d theme/dev ]; then rm -rf theme/dev/* ; fi
	@cp -r dist/* theme/dev/


bundle-theme: dist-theme
	@cd theme && \
		if [ -d yilog ]; then rm -rf yilog ; fi && \
		mv dev yilog && \
		zip -r yilog.zip ./yilog
