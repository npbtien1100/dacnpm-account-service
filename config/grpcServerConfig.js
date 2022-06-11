import grpc from "@grpc/grpc-js";

import protoLoader from "@grpc/proto-loader";

import adminService from "../src/domain/account/admin/AdminService";

const PATH = "./src/domain/account/admin/adminGrpc.proto";

const grpcServer = new grpc.Server();

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PATH, options);
const adminProto = grpc.loadPackageDefinition(packageDefinition);


// load file proto

// define service

grpcServer.addService(adminProto.AdminService.service, {
    List: async (_, callback) => {
        const result = await adminService.getAll();
        callback(null, result);
    },
    Get: async (request, callback) => {
        const result = await adminService.getOne(request.id);
        callback(null, result);
    },
    Check: async (request, callback) => {
        const result = await adminService.check(request.id);
        callback(null, result);
    }

}
);

export default grpcServer;