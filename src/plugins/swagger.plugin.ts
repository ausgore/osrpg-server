import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyPlugin from "fastify-plugin";

const swagger = fastifyPlugin(async app => {
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'OSRPG API',
				version: '1.0.0'
			}
		}
	});

	app.register(fastifySwaggerUi, { routePrefix: '/' });
});

export default fastifyPlugin(swagger);