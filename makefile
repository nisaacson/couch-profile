MOCHA=node_modules/.bin/mocha
REPORTER=spec
test:
	$(MOCHA) $(shell find test -name "*-test.js") --test --reporter $(REPORTER)
db:
	$(MOCHA) $(shell find test -name "get-db-test.js") --test --reporter $(REPORTER)
