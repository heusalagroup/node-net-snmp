declare module "net-snmp";

declare type OidStringList = string[];

declare interface VarBind {
    oid: string;
    value: string;
}

declare type VarBindList = VarBind[];

declare interface SessionGetCallback {
    (error: any, varbinds: VarBindList) : void;
}

declare enum TrapType {
    ColdStart = 0,
    WarmStart = 1,
    LinkDown = 2,
    LinkUp = 3,
    AuthenticationFailure = 4,
    EgpNeighborLoss = 5,
    EnterpriseSpecific = 6
}

declare interface SessionTrapCallback {
    (error: any) : void;
}

declare enum Version {
    Version1  = 0,
    Version2c = 1,
    Version3  = 3
}

declare enum TransportFamily {
    udp4 = "udp4"
}

declare interface SessionOptions {
    version                 ?: Version;
    transport               ?: TransportFamily;
    port                    ?: number;
    trapPort                ?: number;
    retries                 ?: number;
    timeout                 ?: number;
    backoff                 ?: number;
    upTime                  ?: number;
    nonRepeaters            ?: number;
    maxRepetitions          ?: number;
    sourceAddress           ?: string;
    sourcePort              ?: string;
    idBitsSize              ?: string;
    context                 ?: string;
    backwardsGetNexts       ?: boolean;
    reportOidMismatchErrors ?: boolean;
}

/**
 * This object contains constants to specify the security of an SNMPv3 message as per RFC 3414
 */
declare enum SecurityLevel {

    /**
     * no message authentication or encryption
     */
    noAuthNoPriv = 1,

    /**
     * message authentication and no encryption
     */
    authNoPriv = 2,

    /**
     * message authentication and encryption
     */
    authPriv = 3,

}

declare enum PrivProtocols {
    none = "1",
    des = "2",
    aes = "4",
    aes256b = "6",
    aes256r = "8",
}

declare enum AuthProtocols {
    none = "1",
    md5 = "2",
    sha = "3",
    sha224 = "4",
    sha256 = "5",
    sha384 = "6",
    sha512 = "7",
}

declare interface User {
    name          : string;
    privProtocol ?: PrivProtocols;
    privKey      ?: string;
    authProtocol ?: AuthProtocols;
    authKey      ?: string;
    level        ?: SecurityLevel;
}

export class Session {
    target : string;
    version : Version;
    get(oids: OidStringList, callback: SessionGetCallback);
    trap(trapType: TrapType, callback: SessionTrapCallback);
    close(): void;
    static create(target : string, community ?: string, options ?: SessionOptions) : Session;
    static createV3(target : string, user : User, options ?: SessionOptions) : Session;
}

export function createSession (target : string, community ?: string, options ?: SessionOptions) : Session;
export function createV3Session (target : string, user : User, options ?: SessionOptions) : Session;

export function isVarbindError (error : any) : boolean;
export function varbindError (error : any) : string;

