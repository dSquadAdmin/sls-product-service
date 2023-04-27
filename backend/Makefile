AUTH_SECRET_KEY?=random-secret-key
ENV?=dev

.EXPORT_ALL_VARIABLES:

echo-vars:
	@echo "-----------------------------------"
	@echo "ENV: $(ENV)"
	@echo "-----------------------------------"

deploy-service: echo-vars
	@echo "Deployment Started ..."
	AUTH_ECRET_KET=$(AUTH_SECRET_KEY) serverless deploy --verbose --stage $(ENV)

delete-service: echo-vars
	AUTH_ECRET_KET=$(AUTH_SECRET_KEY) serverless remove --verbose --stage $(ENV)
