import grpc from "@grpc/grpc-js";

import protoLoader from "@grpc/proto-loader";

import adminService from "../src/domain/account/admin/AdminService";

import userService from "../src/domain/account/user/UserService";

const PATH = "./src/domain/account/admin/adminGrpc.proto";

const PATH_USER = "./src/domain/account/user/userGrpc.proto";

const grpcServer = new grpc.Server();

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PATH, options);
var userDefinition = protoLoader.loadSync(PATH_USER, options);
const adminProto = grpc.loadPackageDefinition(packageDefinition);
const userProto = grpc.loadPackageDefinition(userDefinition);


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
        const stringId = call.request.id;
        const name = call.request.name;

        const result = await adminService.check(stringId, name);
        if (result.statusCode != 200) {

            callback(null, { isAdmin: false });
        }
        callback(null, { isAdmin: true });
    }
}
);

grpcServer.addService(userProto.UserService.service, {
    List: async (_, callback) => {
        const result = await userService.getAll();
        callback(null, result.json);
    },
    Get: async (call, callback) => {
        const id = call.request.id;
        const result = await userService.getUserById(id);
        callback(null, result.json);
    },
    Check: async (call, callback) => {
        const stringId = call.request.id;
        const name = call.request.name;
        const result = await userService.checkUserExist(stringId, name);
        if (result.statusCode != 200) {
            callback(null, { isUser: false });
        }
        callback(null, { isUser: true });
    }
});

export default grpcServer;