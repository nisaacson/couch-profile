MOCHA=node_modules/.bin/mocha
REPORTER=spec
test:
	$(MOCHA) $(shell find test -name "*-test.js") --test --reporter $(REPORTER)
db:
	$(MOCHA) $(shell find test -name "get-db-test.js") --test --reporter $(REPORTER)
create:
	$(MOCHA) $(shell find test -name "create-profile-test.js") --test --reporter $(REPORTER)
hash-password:
	$(MOCHA) test/hash-password-test.js --ignore-leaks --reporter $(REPORTER)
.PHONY: test