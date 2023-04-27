API_URL?=https://localhost:3000
ENV?=dev

.EXPORT_ALL_VARIABLES:

echo-vars:
	@echo "-----------------------------------"
	@echo "API_URL: $(API_URL)"
	@echo "ENV: $(ENV)"
	@echo "-----------------------------------"

deploy-service: echo-vars
	@echo "Deployment Started..."
	echo 'export const baseUrl = "$(API_URL)";' > src/api/url.ts
	npm run build
	serverless deploy --verbose --stage $(ENV)

delete-service: echo-vars
	serverless remove --verbose --stage $(ENV)