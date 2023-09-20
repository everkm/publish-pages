drone:
	./scripts/merge_drone.sh

.PHONY: tag
tag:
	@if [ "$(TAG)" != "" ]; then \
		git tag -f $(TAG); \
		git push -f liveio $(TAG); \
	fi