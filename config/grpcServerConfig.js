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
        callback(null, result.json);
    },
    Get: async (call, callback) => {
        const id = call.request.id;
        const result = await adminService.getOne(id);
        callback(null, result.json);
    },
    Check: async (call, callback) => {
        const stringId = "" + call.request.id;
        const result = await adminService.check(stringId);
        callback(null, result.json);
    }
}
);

export default grpcServer;