.PHONY: moduleDefault
moduleDefault:
	# run with default module setting
	go env -w GO111MODULE="" && go run main.go

.PHONY: moduleOn
moduleOn:
	# run with module on
	go env -w GO111MODULE="on" && go run main.go

.PHONY: moduleOff
moduleOff:
	# run with module off
	go env -w GO111MODULE="off" && go run main.go
