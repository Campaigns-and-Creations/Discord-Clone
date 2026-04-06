
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Server
 * 
 */
export type Server = $Result.DefaultSelection<Prisma.$ServerPayload>
/**
 * Model Channel
 * 
 */
export type Channel = $Result.DefaultSelection<Prisma.$ChannelPayload>
/**
 * Model ServerMember
 * 
 */
export type ServerMember = $Result.DefaultSelection<Prisma.$ServerMemberPayload>
/**
 * Model ServerRoles
 * 
 */
export type ServerRoles = $Result.DefaultSelection<Prisma.$ServerRolesPayload>
/**
 * Model ServerRolePermission
 * 
 */
export type ServerRolePermission = $Result.DefaultSelection<Prisma.$ServerRolePermissionPayload>
/**
 * Model Messages
 * 
 */
export type Messages = $Result.DefaultSelection<Prisma.$MessagesPayload>
/**
 * Model ServerInvite
 * 
 */
export type ServerInvite = $Result.DefaultSelection<Prisma.$ServerInvitePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ChannelType: {
  TEXT: 'TEXT',
  VOICE: 'VOICE'
};

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType]


export const Permission: {
  ADMINISTRATOR: 'ADMINISTRATOR',
  MANAGE_SERVER: 'MANAGE_SERVER',
  MANAGE_CHANNELS: 'MANAGE_CHANNELS',
  CREATE_INVITE: 'CREATE_INVITE',
  MANAGE_MESSAGES: 'MANAGE_MESSAGES',
  PIN_MESSAGES: 'PIN_MESSAGES',
  MODERATE_MEMBERS: 'MODERATE_MEMBERS',
  KICK_MEMBERS: 'KICK_MEMBERS',
  BAN_MEMBERS: 'BAN_MEMBERS',
  VIEW_CHANNEL: 'VIEW_CHANNEL',
  SEND_MESSAGES: 'SEND_MESSAGES',
  READ_MESSAGE_HISTORY: 'READ_MESSAGE_HISTORY'
};

export type Permission = (typeof Permission)[keyof typeof Permission]

}

export type ChannelType = $Enums.ChannelType

export const ChannelType: typeof $Enums.ChannelType

export type Permission = $Enums.Permission

export const Permission: typeof $Enums.Permission

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Servers
 * const servers = await prisma.server.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Servers
   * const servers = await prisma.server.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.server`: Exposes CRUD operations for the **Server** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servers
    * const servers = await prisma.server.findMany()
    * ```
    */
  get server(): Prisma.ServerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.channel`: Exposes CRUD operations for the **Channel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channels
    * const channels = await prisma.channel.findMany()
    * ```
    */
  get channel(): Prisma.ChannelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serverMember`: Exposes CRUD operations for the **ServerMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServerMembers
    * const serverMembers = await prisma.serverMember.findMany()
    * ```
    */
  get serverMember(): Prisma.ServerMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serverRoles`: Exposes CRUD operations for the **ServerRoles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServerRoles
    * const serverRoles = await prisma.serverRoles.findMany()
    * ```
    */
  get serverRoles(): Prisma.ServerRolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serverRolePermission`: Exposes CRUD operations for the **ServerRolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServerRolePermissions
    * const serverRolePermissions = await prisma.serverRolePermission.findMany()
    * ```
    */
  get serverRolePermission(): Prisma.ServerRolePermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messages`: Exposes CRUD operations for the **Messages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.messages.findMany()
    * ```
    */
  get messages(): Prisma.MessagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serverInvite`: Exposes CRUD operations for the **ServerInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServerInvites
    * const serverInvites = await prisma.serverInvite.findMany()
    * ```
    */
  get serverInvite(): Prisma.ServerInviteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Server: 'Server',
    Channel: 'Channel',
    ServerMember: 'ServerMember',
    ServerRoles: 'ServerRoles',
    ServerRolePermission: 'ServerRolePermission',
    Messages: 'Messages',
    ServerInvite: 'ServerInvite',
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "server" | "channel" | "serverMember" | "serverRoles" | "serverRolePermission" | "messages" | "serverInvite" | "user" | "session" | "account" | "verification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Server: {
        payload: Prisma.$ServerPayload<ExtArgs>
        fields: Prisma.ServerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          findFirst: {
            args: Prisma.ServerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          findMany: {
            args: Prisma.ServerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          create: {
            args: Prisma.ServerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          createMany: {
            args: Prisma.ServerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          delete: {
            args: Prisma.ServerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          update: {
            args: Prisma.ServerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          deleteMany: {
            args: Prisma.ServerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          upsert: {
            args: Prisma.ServerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          aggregate: {
            args: Prisma.ServerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServer>
          }
          groupBy: {
            args: Prisma.ServerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerCountArgs<ExtArgs>
            result: $Utils.Optional<ServerCountAggregateOutputType> | number
          }
        }
      }
      Channel: {
        payload: Prisma.$ChannelPayload<ExtArgs>
        fields: Prisma.ChannelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChannelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChannelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          findFirst: {
            args: Prisma.ChannelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChannelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          findMany: {
            args: Prisma.ChannelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          create: {
            args: Prisma.ChannelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          createMany: {
            args: Prisma.ChannelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChannelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          delete: {
            args: Prisma.ChannelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          update: {
            args: Prisma.ChannelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          deleteMany: {
            args: Prisma.ChannelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChannelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChannelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          upsert: {
            args: Prisma.ChannelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          aggregate: {
            args: Prisma.ChannelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChannel>
          }
          groupBy: {
            args: Prisma.ChannelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChannelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChannelCountArgs<ExtArgs>
            result: $Utils.Optional<ChannelCountAggregateOutputType> | number
          }
        }
      }
      ServerMember: {
        payload: Prisma.$ServerMemberPayload<ExtArgs>
        fields: Prisma.ServerMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          findFirst: {
            args: Prisma.ServerMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          findMany: {
            args: Prisma.ServerMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>[]
          }
          create: {
            args: Prisma.ServerMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          createMany: {
            args: Prisma.ServerMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>[]
          }
          delete: {
            args: Prisma.ServerMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          update: {
            args: Prisma.ServerMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          deleteMany: {
            args: Prisma.ServerMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>[]
          }
          upsert: {
            args: Prisma.ServerMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          aggregate: {
            args: Prisma.ServerMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServerMember>
          }
          groupBy: {
            args: Prisma.ServerMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ServerMemberCountAggregateOutputType> | number
          }
        }
      }
      ServerRoles: {
        payload: Prisma.$ServerRolesPayload<ExtArgs>
        fields: Prisma.ServerRolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerRolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerRolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>
          }
          findFirst: {
            args: Prisma.ServerRolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerRolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>
          }
          findMany: {
            args: Prisma.ServerRolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>[]
          }
          create: {
            args: Prisma.ServerRolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>
          }
          createMany: {
            args: Prisma.ServerRolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerRolesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>[]
          }
          delete: {
            args: Prisma.ServerRolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>
          }
          update: {
            args: Prisma.ServerRolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>
          }
          deleteMany: {
            args: Prisma.ServerRolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerRolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerRolesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>[]
          }
          upsert: {
            args: Prisma.ServerRolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolesPayload>
          }
          aggregate: {
            args: Prisma.ServerRolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServerRoles>
          }
          groupBy: {
            args: Prisma.ServerRolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerRolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerRolesCountArgs<ExtArgs>
            result: $Utils.Optional<ServerRolesCountAggregateOutputType> | number
          }
        }
      }
      ServerRolePermission: {
        payload: Prisma.$ServerRolePermissionPayload<ExtArgs>
        fields: Prisma.ServerRolePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerRolePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerRolePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>
          }
          findFirst: {
            args: Prisma.ServerRolePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerRolePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>
          }
          findMany: {
            args: Prisma.ServerRolePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>[]
          }
          create: {
            args: Prisma.ServerRolePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>
          }
          createMany: {
            args: Prisma.ServerRolePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerRolePermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>[]
          }
          delete: {
            args: Prisma.ServerRolePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>
          }
          update: {
            args: Prisma.ServerRolePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>
          }
          deleteMany: {
            args: Prisma.ServerRolePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerRolePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerRolePermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>[]
          }
          upsert: {
            args: Prisma.ServerRolePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerRolePermissionPayload>
          }
          aggregate: {
            args: Prisma.ServerRolePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServerRolePermission>
          }
          groupBy: {
            args: Prisma.ServerRolePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerRolePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerRolePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<ServerRolePermissionCountAggregateOutputType> | number
          }
        }
      }
      Messages: {
        payload: Prisma.$MessagesPayload<ExtArgs>
        fields: Prisma.MessagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>
          }
          findFirst: {
            args: Prisma.MessagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>
          }
          findMany: {
            args: Prisma.MessagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>[]
          }
          create: {
            args: Prisma.MessagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>
          }
          createMany: {
            args: Prisma.MessagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>[]
          }
          delete: {
            args: Prisma.MessagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>
          }
          update: {
            args: Prisma.MessagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>
          }
          deleteMany: {
            args: Prisma.MessagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>[]
          }
          upsert: {
            args: Prisma.MessagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagesPayload>
          }
          aggregate: {
            args: Prisma.MessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessages>
          }
          groupBy: {
            args: Prisma.MessagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessagesCountArgs<ExtArgs>
            result: $Utils.Optional<MessagesCountAggregateOutputType> | number
          }
        }
      }
      ServerInvite: {
        payload: Prisma.$ServerInvitePayload<ExtArgs>
        fields: Prisma.ServerInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          findFirst: {
            args: Prisma.ServerInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          findMany: {
            args: Prisma.ServerInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>[]
          }
          create: {
            args: Prisma.ServerInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          createMany: {
            args: Prisma.ServerInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>[]
          }
          delete: {
            args: Prisma.ServerInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          update: {
            args: Prisma.ServerInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          deleteMany: {
            args: Prisma.ServerInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>[]
          }
          upsert: {
            args: Prisma.ServerInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          aggregate: {
            args: Prisma.ServerInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServerInvite>
          }
          groupBy: {
            args: Prisma.ServerInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerInviteCountArgs<ExtArgs>
            result: $Utils.Optional<ServerInviteCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    server?: ServerOmit
    channel?: ChannelOmit
    serverMember?: ServerMemberOmit
    serverRoles?: ServerRolesOmit
    serverRolePermission?: ServerRolePermissionOmit
    messages?: MessagesOmit
    serverInvite?: ServerInviteOmit
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ServerCountOutputType
   */

  export type ServerCountOutputType = {
    channels: number
    members: number
    roles: number
    invites: number
  }

  export type ServerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channels?: boolean | ServerCountOutputTypeCountChannelsArgs
    members?: boolean | ServerCountOutputTypeCountMembersArgs
    roles?: boolean | ServerCountOutputTypeCountRolesArgs
    invites?: boolean | ServerCountOutputTypeCountInvitesArgs
  }

  // Custom InputTypes
  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerCountOutputType
     */
    select?: ServerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountChannelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerMemberWhereInput
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerRolesWhereInput
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerInviteWhereInput
  }


  /**
   * Count Type ChannelCountOutputType
   */

  export type ChannelCountOutputType = {
    messages: number
    users: number
  }

  export type ChannelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ChannelCountOutputTypeCountMessagesArgs
    users?: boolean | ChannelCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelCountOutputType
     */
    select?: ChannelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessagesWhereInput
  }

  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type ServerMemberCountOutputType
   */

  export type ServerMemberCountOutputType = {
    serverRoles: number
  }

  export type ServerMemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serverRoles?: boolean | ServerMemberCountOutputTypeCountServerRolesArgs
  }

  // Custom InputTypes
  /**
   * ServerMemberCountOutputType without action
   */
  export type ServerMemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMemberCountOutputType
     */
    select?: ServerMemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServerMemberCountOutputType without action
   */
  export type ServerMemberCountOutputTypeCountServerRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerRolesWhereInput
  }


  /**
   * Count Type ServerRolesCountOutputType
   */

  export type ServerRolesCountOutputType = {
    members: number
    permissions: number
  }

  export type ServerRolesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ServerRolesCountOutputTypeCountMembersArgs
    permissions?: boolean | ServerRolesCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * ServerRolesCountOutputType without action
   */
  export type ServerRolesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolesCountOutputType
     */
    select?: ServerRolesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServerRolesCountOutputType without action
   */
  export type ServerRolesCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerMemberWhereInput
  }

  /**
   * ServerRolesCountOutputType without action
   */
  export type ServerRolesCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerRolePermissionWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
    messages: number
    memberships: number
    channels: number
    createdInvites: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    channels?: boolean | UserCountOutputTypeCountChannelsArgs
    createdInvites?: boolean | UserCountOutputTypeCountCreatedInvitesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessagesWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChannelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerInviteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Server
   */

  export type AggregateServer = {
    _count: ServerCountAggregateOutputType | null
    _min: ServerMinAggregateOutputType | null
    _max: ServerMaxAggregateOutputType | null
  }

  export type ServerMinAggregateOutputType = {
    id: string | null
    name: string | null
    picture: string | null
    createdAt: Date | null
  }

  export type ServerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    picture: string | null
    createdAt: Date | null
  }

  export type ServerCountAggregateOutputType = {
    id: number
    name: number
    picture: number
    createdAt: number
    _all: number
  }


  export type ServerMinAggregateInputType = {
    id?: true
    name?: true
    picture?: true
    createdAt?: true
  }

  export type ServerMaxAggregateInputType = {
    id?: true
    name?: true
    picture?: true
    createdAt?: true
  }

  export type ServerCountAggregateInputType = {
    id?: true
    name?: true
    picture?: true
    createdAt?: true
    _all?: true
  }

  export type ServerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Server to aggregate.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Servers
    **/
    _count?: true | ServerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerMaxAggregateInputType
  }

  export type GetServerAggregateType<T extends ServerAggregateArgs> = {
        [P in keyof T & keyof AggregateServer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServer[P]>
      : GetScalarType<T[P], AggregateServer[P]>
  }




  export type ServerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerWhereInput
    orderBy?: ServerOrderByWithAggregationInput | ServerOrderByWithAggregationInput[]
    by: ServerScalarFieldEnum[] | ServerScalarFieldEnum
    having?: ServerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerCountAggregateInputType | true
    _min?: ServerMinAggregateInputType
    _max?: ServerMaxAggregateInputType
  }

  export type ServerGroupByOutputType = {
    id: string
    name: string
    picture: string | null
    createdAt: Date
    _count: ServerCountAggregateOutputType | null
    _min: ServerMinAggregateOutputType | null
    _max: ServerMaxAggregateOutputType | null
  }

  type GetServerGroupByPayload<T extends ServerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerGroupByOutputType[P]>
            : GetScalarType<T[P], ServerGroupByOutputType[P]>
        }
      >
    >


  export type ServerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    picture?: boolean
    createdAt?: boolean
    channels?: boolean | Server$channelsArgs<ExtArgs>
    members?: boolean | Server$membersArgs<ExtArgs>
    roles?: boolean | Server$rolesArgs<ExtArgs>
    invites?: boolean | Server$invitesArgs<ExtArgs>
    _count?: boolean | ServerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["server"]>

  export type ServerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    picture?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["server"]>

  export type ServerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    picture?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["server"]>

  export type ServerSelectScalar = {
    id?: boolean
    name?: boolean
    picture?: boolean
    createdAt?: boolean
  }

  export type ServerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "picture" | "createdAt", ExtArgs["result"]["server"]>
  export type ServerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channels?: boolean | Server$channelsArgs<ExtArgs>
    members?: boolean | Server$membersArgs<ExtArgs>
    roles?: boolean | Server$rolesArgs<ExtArgs>
    invites?: boolean | Server$invitesArgs<ExtArgs>
    _count?: boolean | ServerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Server"
    objects: {
      channels: Prisma.$ChannelPayload<ExtArgs>[]
      members: Prisma.$ServerMemberPayload<ExtArgs>[]
      roles: Prisma.$ServerRolesPayload<ExtArgs>[]
      invites: Prisma.$ServerInvitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      picture: string | null
      createdAt: Date
    }, ExtArgs["result"]["server"]>
    composites: {}
  }

  type ServerGetPayload<S extends boolean | null | undefined | ServerDefaultArgs> = $Result.GetResult<Prisma.$ServerPayload, S>

  type ServerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerCountAggregateInputType | true
    }

  export interface ServerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Server'], meta: { name: 'Server' } }
    /**
     * Find zero or one Server that matches the filter.
     * @param {ServerFindUniqueArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerFindUniqueArgs>(args: SelectSubset<T, ServerFindUniqueArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Server that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerFindUniqueOrThrowArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Server that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindFirstArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerFindFirstArgs>(args?: SelectSubset<T, ServerFindFirstArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Server that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindFirstOrThrowArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Servers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servers
     * const servers = await prisma.server.findMany()
     * 
     * // Get first 10 Servers
     * const servers = await prisma.server.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverWithIdOnly = await prisma.server.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerFindManyArgs>(args?: SelectSubset<T, ServerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Server.
     * @param {ServerCreateArgs} args - Arguments to create a Server.
     * @example
     * // Create one Server
     * const Server = await prisma.server.create({
     *   data: {
     *     // ... data to create a Server
     *   }
     * })
     * 
     */
    create<T extends ServerCreateArgs>(args: SelectSubset<T, ServerCreateArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Servers.
     * @param {ServerCreateManyArgs} args - Arguments to create many Servers.
     * @example
     * // Create many Servers
     * const server = await prisma.server.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerCreateManyArgs>(args?: SelectSubset<T, ServerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Servers and returns the data saved in the database.
     * @param {ServerCreateManyAndReturnArgs} args - Arguments to create many Servers.
     * @example
     * // Create many Servers
     * const server = await prisma.server.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Servers and only return the `id`
     * const serverWithIdOnly = await prisma.server.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Server.
     * @param {ServerDeleteArgs} args - Arguments to delete one Server.
     * @example
     * // Delete one Server
     * const Server = await prisma.server.delete({
     *   where: {
     *     // ... filter to delete one Server
     *   }
     * })
     * 
     */
    delete<T extends ServerDeleteArgs>(args: SelectSubset<T, ServerDeleteArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Server.
     * @param {ServerUpdateArgs} args - Arguments to update one Server.
     * @example
     * // Update one Server
     * const server = await prisma.server.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerUpdateArgs>(args: SelectSubset<T, ServerUpdateArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Servers.
     * @param {ServerDeleteManyArgs} args - Arguments to filter Servers to delete.
     * @example
     * // Delete a few Servers
     * const { count } = await prisma.server.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerDeleteManyArgs>(args?: SelectSubset<T, ServerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servers
     * const server = await prisma.server.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerUpdateManyArgs>(args: SelectSubset<T, ServerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servers and returns the data updated in the database.
     * @param {ServerUpdateManyAndReturnArgs} args - Arguments to update many Servers.
     * @example
     * // Update many Servers
     * const server = await prisma.server.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Servers and only return the `id`
     * const serverWithIdOnly = await prisma.server.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Server.
     * @param {ServerUpsertArgs} args - Arguments to update or create a Server.
     * @example
     * // Update or create a Server
     * const server = await prisma.server.upsert({
     *   create: {
     *     // ... data to create a Server
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Server we want to update
     *   }
     * })
     */
    upsert<T extends ServerUpsertArgs>(args: SelectSubset<T, ServerUpsertArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Servers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerCountArgs} args - Arguments to filter Servers to count.
     * @example
     * // Count the number of Servers
     * const count = await prisma.server.count({
     *   where: {
     *     // ... the filter for the Servers we want to count
     *   }
     * })
    **/
    count<T extends ServerCountArgs>(
      args?: Subset<T, ServerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Server.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerAggregateArgs>(args: Subset<T, ServerAggregateArgs>): Prisma.PrismaPromise<GetServerAggregateType<T>>

    /**
     * Group by Server.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerGroupByArgs['orderBy'] }
        : { orderBy?: ServerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Server model
   */
  readonly fields: ServerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Server.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    channels<T extends Server$channelsArgs<ExtArgs> = {}>(args?: Subset<T, Server$channelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends Server$membersArgs<ExtArgs> = {}>(args?: Subset<T, Server$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roles<T extends Server$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Server$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invites<T extends Server$invitesArgs<ExtArgs> = {}>(args?: Subset<T, Server$invitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Server model
   */
  interface ServerFieldRefs {
    readonly id: FieldRef<"Server", 'String'>
    readonly name: FieldRef<"Server", 'String'>
    readonly picture: FieldRef<"Server", 'String'>
    readonly createdAt: FieldRef<"Server", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Server findUnique
   */
  export type ServerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server findUniqueOrThrow
   */
  export type ServerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server findFirst
   */
  export type ServerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     */
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server findFirstOrThrow
   */
  export type ServerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     */
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server findMany
   */
  export type ServerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Servers to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     */
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server create
   */
  export type ServerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The data needed to create a Server.
     */
    data: XOR<ServerCreateInput, ServerUncheckedCreateInput>
  }

  /**
   * Server createMany
   */
  export type ServerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Servers.
     */
    data: ServerCreateManyInput | ServerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Server createManyAndReturn
   */
  export type ServerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * The data used to create many Servers.
     */
    data: ServerCreateManyInput | ServerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Server update
   */
  export type ServerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The data needed to update a Server.
     */
    data: XOR<ServerUpdateInput, ServerUncheckedUpdateInput>
    /**
     * Choose, which Server to update.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server updateMany
   */
  export type ServerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Servers.
     */
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyInput>
    /**
     * Filter which Servers to update
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to update.
     */
    limit?: number
  }

  /**
   * Server updateManyAndReturn
   */
  export type ServerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * The data used to update Servers.
     */
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyInput>
    /**
     * Filter which Servers to update
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to update.
     */
    limit?: number
  }

  /**
   * Server upsert
   */
  export type ServerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The filter to search for the Server to update in case it exists.
     */
    where: ServerWhereUniqueInput
    /**
     * In case the Server found by the `where` argument doesn't exist, create a new Server with this data.
     */
    create: XOR<ServerCreateInput, ServerUncheckedCreateInput>
    /**
     * In case the Server was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerUpdateInput, ServerUncheckedUpdateInput>
  }

  /**
   * Server delete
   */
  export type ServerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter which Server to delete.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server deleteMany
   */
  export type ServerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Servers to delete
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to delete.
     */
    limit?: number
  }

  /**
   * Server.channels
   */
  export type Server$channelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    cursor?: ChannelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Server.members
   */
  export type Server$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    where?: ServerMemberWhereInput
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    cursor?: ServerMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * Server.roles
   */
  export type Server$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    where?: ServerRolesWhereInput
    orderBy?: ServerRolesOrderByWithRelationInput | ServerRolesOrderByWithRelationInput[]
    cursor?: ServerRolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerRolesScalarFieldEnum | ServerRolesScalarFieldEnum[]
  }

  /**
   * Server.invites
   */
  export type Server$invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    where?: ServerInviteWhereInput
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    cursor?: ServerInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * Server without action
   */
  export type ServerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
  }


  /**
   * Model Channel
   */

  export type AggregateChannel = {
    _count: ChannelCountAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  export type ChannelMinAggregateOutputType = {
    id: string | null
    name: string | null
    serverId: string | null
    createdAt: Date | null
    type: $Enums.ChannelType | null
  }

  export type ChannelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    serverId: string | null
    createdAt: Date | null
    type: $Enums.ChannelType | null
  }

  export type ChannelCountAggregateOutputType = {
    id: number
    name: number
    serverId: number
    createdAt: number
    type: number
    _all: number
  }


  export type ChannelMinAggregateInputType = {
    id?: true
    name?: true
    serverId?: true
    createdAt?: true
    type?: true
  }

  export type ChannelMaxAggregateInputType = {
    id?: true
    name?: true
    serverId?: true
    createdAt?: true
    type?: true
  }

  export type ChannelCountAggregateInputType = {
    id?: true
    name?: true
    serverId?: true
    createdAt?: true
    type?: true
    _all?: true
  }

  export type ChannelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Channel to aggregate.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Channels
    **/
    _count?: true | ChannelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelMaxAggregateInputType
  }

  export type GetChannelAggregateType<T extends ChannelAggregateArgs> = {
        [P in keyof T & keyof AggregateChannel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannel[P]>
      : GetScalarType<T[P], AggregateChannel[P]>
  }




  export type ChannelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithAggregationInput | ChannelOrderByWithAggregationInput[]
    by: ChannelScalarFieldEnum[] | ChannelScalarFieldEnum
    having?: ChannelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelCountAggregateInputType | true
    _min?: ChannelMinAggregateInputType
    _max?: ChannelMaxAggregateInputType
  }

  export type ChannelGroupByOutputType = {
    id: string
    name: string
    serverId: string
    createdAt: Date
    type: $Enums.ChannelType
    _count: ChannelCountAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  type GetChannelGroupByPayload<T extends ChannelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChannelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelGroupByOutputType[P]>
        }
      >
    >


  export type ChannelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    serverId?: boolean
    createdAt?: boolean
    type?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    messages?: boolean | Channel$messagesArgs<ExtArgs>
    users?: boolean | Channel$usersArgs<ExtArgs>
    _count?: boolean | ChannelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    serverId?: boolean
    createdAt?: boolean
    type?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    serverId?: boolean
    createdAt?: boolean
    type?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectScalar = {
    id?: boolean
    name?: boolean
    serverId?: boolean
    createdAt?: boolean
    type?: boolean
  }

  export type ChannelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "serverId" | "createdAt" | "type", ExtArgs["result"]["channel"]>
  export type ChannelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    messages?: boolean | Channel$messagesArgs<ExtArgs>
    users?: boolean | Channel$usersArgs<ExtArgs>
    _count?: boolean | ChannelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChannelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type ChannelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }

  export type $ChannelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Channel"
    objects: {
      server: Prisma.$ServerPayload<ExtArgs>
      messages: Prisma.$MessagesPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      serverId: string
      createdAt: Date
      type: $Enums.ChannelType
    }, ExtArgs["result"]["channel"]>
    composites: {}
  }

  type ChannelGetPayload<S extends boolean | null | undefined | ChannelDefaultArgs> = $Result.GetResult<Prisma.$ChannelPayload, S>

  type ChannelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChannelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChannelCountAggregateInputType | true
    }

  export interface ChannelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Channel'], meta: { name: 'Channel' } }
    /**
     * Find zero or one Channel that matches the filter.
     * @param {ChannelFindUniqueArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChannelFindUniqueArgs>(args: SelectSubset<T, ChannelFindUniqueArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Channel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChannelFindUniqueOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChannelFindUniqueOrThrowArgs>(args: SelectSubset<T, ChannelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChannelFindFirstArgs>(args?: SelectSubset<T, ChannelFindFirstArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChannelFindFirstOrThrowArgs>(args?: SelectSubset<T, ChannelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Channels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Channels
     * const channels = await prisma.channel.findMany()
     * 
     * // Get first 10 Channels
     * const channels = await prisma.channel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const channelWithIdOnly = await prisma.channel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChannelFindManyArgs>(args?: SelectSubset<T, ChannelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Channel.
     * @param {ChannelCreateArgs} args - Arguments to create a Channel.
     * @example
     * // Create one Channel
     * const Channel = await prisma.channel.create({
     *   data: {
     *     // ... data to create a Channel
     *   }
     * })
     * 
     */
    create<T extends ChannelCreateArgs>(args: SelectSubset<T, ChannelCreateArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Channels.
     * @param {ChannelCreateManyArgs} args - Arguments to create many Channels.
     * @example
     * // Create many Channels
     * const channel = await prisma.channel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChannelCreateManyArgs>(args?: SelectSubset<T, ChannelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Channels and returns the data saved in the database.
     * @param {ChannelCreateManyAndReturnArgs} args - Arguments to create many Channels.
     * @example
     * // Create many Channels
     * const channel = await prisma.channel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Channels and only return the `id`
     * const channelWithIdOnly = await prisma.channel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChannelCreateManyAndReturnArgs>(args?: SelectSubset<T, ChannelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Channel.
     * @param {ChannelDeleteArgs} args - Arguments to delete one Channel.
     * @example
     * // Delete one Channel
     * const Channel = await prisma.channel.delete({
     *   where: {
     *     // ... filter to delete one Channel
     *   }
     * })
     * 
     */
    delete<T extends ChannelDeleteArgs>(args: SelectSubset<T, ChannelDeleteArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Channel.
     * @param {ChannelUpdateArgs} args - Arguments to update one Channel.
     * @example
     * // Update one Channel
     * const channel = await prisma.channel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChannelUpdateArgs>(args: SelectSubset<T, ChannelUpdateArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Channels.
     * @param {ChannelDeleteManyArgs} args - Arguments to filter Channels to delete.
     * @example
     * // Delete a few Channels
     * const { count } = await prisma.channel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChannelDeleteManyArgs>(args?: SelectSubset<T, ChannelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChannelUpdateManyArgs>(args: SelectSubset<T, ChannelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels and returns the data updated in the database.
     * @param {ChannelUpdateManyAndReturnArgs} args - Arguments to update many Channels.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Channels and only return the `id`
     * const channelWithIdOnly = await prisma.channel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChannelUpdateManyAndReturnArgs>(args: SelectSubset<T, ChannelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Channel.
     * @param {ChannelUpsertArgs} args - Arguments to update or create a Channel.
     * @example
     * // Update or create a Channel
     * const channel = await prisma.channel.upsert({
     *   create: {
     *     // ... data to create a Channel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Channel we want to update
     *   }
     * })
     */
    upsert<T extends ChannelUpsertArgs>(args: SelectSubset<T, ChannelUpsertArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelCountArgs} args - Arguments to filter Channels to count.
     * @example
     * // Count the number of Channels
     * const count = await prisma.channel.count({
     *   where: {
     *     // ... the filter for the Channels we want to count
     *   }
     * })
    **/
    count<T extends ChannelCountArgs>(
      args?: Subset<T, ChannelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChannelAggregateArgs>(args: Subset<T, ChannelAggregateArgs>): Prisma.PrismaPromise<GetChannelAggregateType<T>>

    /**
     * Group by Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChannelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelGroupByArgs['orderBy'] }
        : { orderBy?: ChannelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Channel model
   */
  readonly fields: ChannelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Channel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChannelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends Channel$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Channel$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Channel$usersArgs<ExtArgs> = {}>(args?: Subset<T, Channel$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Channel model
   */
  interface ChannelFieldRefs {
    readonly id: FieldRef<"Channel", 'String'>
    readonly name: FieldRef<"Channel", 'String'>
    readonly serverId: FieldRef<"Channel", 'String'>
    readonly createdAt: FieldRef<"Channel", 'DateTime'>
    readonly type: FieldRef<"Channel", 'ChannelType'>
  }
    

  // Custom InputTypes
  /**
   * Channel findUnique
   */
  export type ChannelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findUniqueOrThrow
   */
  export type ChannelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findFirst
   */
  export type ChannelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel findFirstOrThrow
   */
  export type ChannelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel findMany
   */
  export type ChannelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channels to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel create
   */
  export type ChannelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The data needed to create a Channel.
     */
    data: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
  }

  /**
   * Channel createMany
   */
  export type ChannelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Channels.
     */
    data: ChannelCreateManyInput | ChannelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Channel createManyAndReturn
   */
  export type ChannelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * The data used to create many Channels.
     */
    data: ChannelCreateManyInput | ChannelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Channel update
   */
  export type ChannelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The data needed to update a Channel.
     */
    data: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
    /**
     * Choose, which Channel to update.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel updateMany
   */
  export type ChannelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to update.
     */
    limit?: number
  }

  /**
   * Channel updateManyAndReturn
   */
  export type ChannelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Channel upsert
   */
  export type ChannelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The filter to search for the Channel to update in case it exists.
     */
    where: ChannelWhereUniqueInput
    /**
     * In case the Channel found by the `where` argument doesn't exist, create a new Channel with this data.
     */
    create: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
    /**
     * In case the Channel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
  }

  /**
   * Channel delete
   */
  export type ChannelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter which Channel to delete.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel deleteMany
   */
  export type ChannelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Channels to delete
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to delete.
     */
    limit?: number
  }

  /**
   * Channel.messages
   */
  export type Channel$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    where?: MessagesWhereInput
    orderBy?: MessagesOrderByWithRelationInput | MessagesOrderByWithRelationInput[]
    cursor?: MessagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * Channel.users
   */
  export type Channel$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Channel without action
   */
  export type ChannelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
  }


  /**
   * Model ServerMember
   */

  export type AggregateServerMember = {
    _count: ServerMemberCountAggregateOutputType | null
    _min: ServerMemberMinAggregateOutputType | null
    _max: ServerMemberMaxAggregateOutputType | null
  }

  export type ServerMemberMinAggregateOutputType = {
    id: string | null
    userId: string | null
    serverId: string | null
    timeoutUntil: Date | null
  }

  export type ServerMemberMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    serverId: string | null
    timeoutUntil: Date | null
  }

  export type ServerMemberCountAggregateOutputType = {
    id: number
    userId: number
    serverId: number
    timeoutUntil: number
    _all: number
  }


  export type ServerMemberMinAggregateInputType = {
    id?: true
    userId?: true
    serverId?: true
    timeoutUntil?: true
  }

  export type ServerMemberMaxAggregateInputType = {
    id?: true
    userId?: true
    serverId?: true
    timeoutUntil?: true
  }

  export type ServerMemberCountAggregateInputType = {
    id?: true
    userId?: true
    serverId?: true
    timeoutUntil?: true
    _all?: true
  }

  export type ServerMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerMember to aggregate.
     */
    where?: ServerMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerMembers to fetch.
     */
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServerMembers
    **/
    _count?: true | ServerMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerMemberMaxAggregateInputType
  }

  export type GetServerMemberAggregateType<T extends ServerMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateServerMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServerMember[P]>
      : GetScalarType<T[P], AggregateServerMember[P]>
  }




  export type ServerMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerMemberWhereInput
    orderBy?: ServerMemberOrderByWithAggregationInput | ServerMemberOrderByWithAggregationInput[]
    by: ServerMemberScalarFieldEnum[] | ServerMemberScalarFieldEnum
    having?: ServerMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerMemberCountAggregateInputType | true
    _min?: ServerMemberMinAggregateInputType
    _max?: ServerMemberMaxAggregateInputType
  }

  export type ServerMemberGroupByOutputType = {
    id: string
    userId: string
    serverId: string
    timeoutUntil: Date | null
    _count: ServerMemberCountAggregateOutputType | null
    _min: ServerMemberMinAggregateOutputType | null
    _max: ServerMemberMaxAggregateOutputType | null
  }

  type GetServerMemberGroupByPayload<T extends ServerMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ServerMemberGroupByOutputType[P]>
        }
      >
    >


  export type ServerMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serverId?: boolean
    timeoutUntil?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    serverRoles?: boolean | ServerMember$serverRolesArgs<ExtArgs>
    _count?: boolean | ServerMemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverMember"]>

  export type ServerMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serverId?: boolean
    timeoutUntil?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverMember"]>

  export type ServerMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serverId?: boolean
    timeoutUntil?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverMember"]>

  export type ServerMemberSelectScalar = {
    id?: boolean
    userId?: boolean
    serverId?: boolean
    timeoutUntil?: boolean
  }

  export type ServerMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "serverId" | "timeoutUntil", ExtArgs["result"]["serverMember"]>
  export type ServerMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    serverRoles?: boolean | ServerMember$serverRolesArgs<ExtArgs>
    _count?: boolean | ServerMemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServerMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ServerMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ServerMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServerMember"
    objects: {
      server: Prisma.$ServerPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      serverRoles: Prisma.$ServerRolesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      serverId: string
      timeoutUntil: Date | null
    }, ExtArgs["result"]["serverMember"]>
    composites: {}
  }

  type ServerMemberGetPayload<S extends boolean | null | undefined | ServerMemberDefaultArgs> = $Result.GetResult<Prisma.$ServerMemberPayload, S>

  type ServerMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerMemberCountAggregateInputType | true
    }

  export interface ServerMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServerMember'], meta: { name: 'ServerMember' } }
    /**
     * Find zero or one ServerMember that matches the filter.
     * @param {ServerMemberFindUniqueArgs} args - Arguments to find a ServerMember
     * @example
     * // Get one ServerMember
     * const serverMember = await prisma.serverMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerMemberFindUniqueArgs>(args: SelectSubset<T, ServerMemberFindUniqueArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServerMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerMemberFindUniqueOrThrowArgs} args - Arguments to find a ServerMember
     * @example
     * // Get one ServerMember
     * const serverMember = await prisma.serverMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberFindFirstArgs} args - Arguments to find a ServerMember
     * @example
     * // Get one ServerMember
     * const serverMember = await prisma.serverMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerMemberFindFirstArgs>(args?: SelectSubset<T, ServerMemberFindFirstArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberFindFirstOrThrowArgs} args - Arguments to find a ServerMember
     * @example
     * // Get one ServerMember
     * const serverMember = await prisma.serverMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServerMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServerMembers
     * const serverMembers = await prisma.serverMember.findMany()
     * 
     * // Get first 10 ServerMembers
     * const serverMembers = await prisma.serverMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverMemberWithIdOnly = await prisma.serverMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerMemberFindManyArgs>(args?: SelectSubset<T, ServerMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServerMember.
     * @param {ServerMemberCreateArgs} args - Arguments to create a ServerMember.
     * @example
     * // Create one ServerMember
     * const ServerMember = await prisma.serverMember.create({
     *   data: {
     *     // ... data to create a ServerMember
     *   }
     * })
     * 
     */
    create<T extends ServerMemberCreateArgs>(args: SelectSubset<T, ServerMemberCreateArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServerMembers.
     * @param {ServerMemberCreateManyArgs} args - Arguments to create many ServerMembers.
     * @example
     * // Create many ServerMembers
     * const serverMember = await prisma.serverMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerMemberCreateManyArgs>(args?: SelectSubset<T, ServerMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServerMembers and returns the data saved in the database.
     * @param {ServerMemberCreateManyAndReturnArgs} args - Arguments to create many ServerMembers.
     * @example
     * // Create many ServerMembers
     * const serverMember = await prisma.serverMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServerMembers and only return the `id`
     * const serverMemberWithIdOnly = await prisma.serverMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServerMember.
     * @param {ServerMemberDeleteArgs} args - Arguments to delete one ServerMember.
     * @example
     * // Delete one ServerMember
     * const ServerMember = await prisma.serverMember.delete({
     *   where: {
     *     // ... filter to delete one ServerMember
     *   }
     * })
     * 
     */
    delete<T extends ServerMemberDeleteArgs>(args: SelectSubset<T, ServerMemberDeleteArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServerMember.
     * @param {ServerMemberUpdateArgs} args - Arguments to update one ServerMember.
     * @example
     * // Update one ServerMember
     * const serverMember = await prisma.serverMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerMemberUpdateArgs>(args: SelectSubset<T, ServerMemberUpdateArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServerMembers.
     * @param {ServerMemberDeleteManyArgs} args - Arguments to filter ServerMembers to delete.
     * @example
     * // Delete a few ServerMembers
     * const { count } = await prisma.serverMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerMemberDeleteManyArgs>(args?: SelectSubset<T, ServerMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServerMembers
     * const serverMember = await prisma.serverMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerMemberUpdateManyArgs>(args: SelectSubset<T, ServerMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerMembers and returns the data updated in the database.
     * @param {ServerMemberUpdateManyAndReturnArgs} args - Arguments to update many ServerMembers.
     * @example
     * // Update many ServerMembers
     * const serverMember = await prisma.serverMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServerMembers and only return the `id`
     * const serverMemberWithIdOnly = await prisma.serverMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServerMember.
     * @param {ServerMemberUpsertArgs} args - Arguments to update or create a ServerMember.
     * @example
     * // Update or create a ServerMember
     * const serverMember = await prisma.serverMember.upsert({
     *   create: {
     *     // ... data to create a ServerMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServerMember we want to update
     *   }
     * })
     */
    upsert<T extends ServerMemberUpsertArgs>(args: SelectSubset<T, ServerMemberUpsertArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServerMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberCountArgs} args - Arguments to filter ServerMembers to count.
     * @example
     * // Count the number of ServerMembers
     * const count = await prisma.serverMember.count({
     *   where: {
     *     // ... the filter for the ServerMembers we want to count
     *   }
     * })
    **/
    count<T extends ServerMemberCountArgs>(
      args?: Subset<T, ServerMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServerMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerMemberAggregateArgs>(args: Subset<T, ServerMemberAggregateArgs>): Prisma.PrismaPromise<GetServerMemberAggregateType<T>>

    /**
     * Group by ServerMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerMemberGroupByArgs['orderBy'] }
        : { orderBy?: ServerMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServerMember model
   */
  readonly fields: ServerMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServerMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    serverRoles<T extends ServerMember$serverRolesArgs<ExtArgs> = {}>(args?: Subset<T, ServerMember$serverRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServerMember model
   */
  interface ServerMemberFieldRefs {
    readonly id: FieldRef<"ServerMember", 'String'>
    readonly userId: FieldRef<"ServerMember", 'String'>
    readonly serverId: FieldRef<"ServerMember", 'String'>
    readonly timeoutUntil: FieldRef<"ServerMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServerMember findUnique
   */
  export type ServerMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMember to fetch.
     */
    where: ServerMemberWhereUniqueInput
  }

  /**
   * ServerMember findUniqueOrThrow
   */
  export type ServerMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMember to fetch.
     */
    where: ServerMemberWhereUniqueInput
  }

  /**
   * ServerMember findFirst
   */
  export type ServerMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMember to fetch.
     */
    where?: ServerMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerMembers to fetch.
     */
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerMembers.
     */
    cursor?: ServerMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerMembers.
     */
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * ServerMember findFirstOrThrow
   */
  export type ServerMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMember to fetch.
     */
    where?: ServerMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerMembers to fetch.
     */
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerMembers.
     */
    cursor?: ServerMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerMembers.
     */
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * ServerMember findMany
   */
  export type ServerMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMembers to fetch.
     */
    where?: ServerMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerMembers to fetch.
     */
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServerMembers.
     */
    cursor?: ServerMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerMembers.
     */
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * ServerMember create
   */
  export type ServerMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ServerMember.
     */
    data: XOR<ServerMemberCreateInput, ServerMemberUncheckedCreateInput>
  }

  /**
   * ServerMember createMany
   */
  export type ServerMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServerMembers.
     */
    data: ServerMemberCreateManyInput | ServerMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServerMember createManyAndReturn
   */
  export type ServerMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ServerMembers.
     */
    data: ServerMemberCreateManyInput | ServerMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerMember update
   */
  export type ServerMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ServerMember.
     */
    data: XOR<ServerMemberUpdateInput, ServerMemberUncheckedUpdateInput>
    /**
     * Choose, which ServerMember to update.
     */
    where: ServerMemberWhereUniqueInput
  }

  /**
   * ServerMember updateMany
   */
  export type ServerMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServerMembers.
     */
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyInput>
    /**
     * Filter which ServerMembers to update
     */
    where?: ServerMemberWhereInput
    /**
     * Limit how many ServerMembers to update.
     */
    limit?: number
  }

  /**
   * ServerMember updateManyAndReturn
   */
  export type ServerMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * The data used to update ServerMembers.
     */
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyInput>
    /**
     * Filter which ServerMembers to update
     */
    where?: ServerMemberWhereInput
    /**
     * Limit how many ServerMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerMember upsert
   */
  export type ServerMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ServerMember to update in case it exists.
     */
    where: ServerMemberWhereUniqueInput
    /**
     * In case the ServerMember found by the `where` argument doesn't exist, create a new ServerMember with this data.
     */
    create: XOR<ServerMemberCreateInput, ServerMemberUncheckedCreateInput>
    /**
     * In case the ServerMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerMemberUpdateInput, ServerMemberUncheckedUpdateInput>
  }

  /**
   * ServerMember delete
   */
  export type ServerMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter which ServerMember to delete.
     */
    where: ServerMemberWhereUniqueInput
  }

  /**
   * ServerMember deleteMany
   */
  export type ServerMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerMembers to delete
     */
    where?: ServerMemberWhereInput
    /**
     * Limit how many ServerMembers to delete.
     */
    limit?: number
  }

  /**
   * ServerMember.serverRoles
   */
  export type ServerMember$serverRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    where?: ServerRolesWhereInput
    orderBy?: ServerRolesOrderByWithRelationInput | ServerRolesOrderByWithRelationInput[]
    cursor?: ServerRolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerRolesScalarFieldEnum | ServerRolesScalarFieldEnum[]
  }

  /**
   * ServerMember without action
   */
  export type ServerMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
  }


  /**
   * Model ServerRoles
   */

  export type AggregateServerRoles = {
    _count: ServerRolesCountAggregateOutputType | null
    _avg: ServerRolesAvgAggregateOutputType | null
    _sum: ServerRolesSumAggregateOutputType | null
    _min: ServerRolesMinAggregateOutputType | null
    _max: ServerRolesMaxAggregateOutputType | null
  }

  export type ServerRolesAvgAggregateOutputType = {
    position: number | null
  }

  export type ServerRolesSumAggregateOutputType = {
    position: number | null
  }

  export type ServerRolesMinAggregateOutputType = {
    id: string | null
    name: string | null
    position: number | null
    serverId: string | null
  }

  export type ServerRolesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    position: number | null
    serverId: string | null
  }

  export type ServerRolesCountAggregateOutputType = {
    id: number
    name: number
    position: number
    serverId: number
    _all: number
  }


  export type ServerRolesAvgAggregateInputType = {
    position?: true
  }

  export type ServerRolesSumAggregateInputType = {
    position?: true
  }

  export type ServerRolesMinAggregateInputType = {
    id?: true
    name?: true
    position?: true
    serverId?: true
  }

  export type ServerRolesMaxAggregateInputType = {
    id?: true
    name?: true
    position?: true
    serverId?: true
  }

  export type ServerRolesCountAggregateInputType = {
    id?: true
    name?: true
    position?: true
    serverId?: true
    _all?: true
  }

  export type ServerRolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerRoles to aggregate.
     */
    where?: ServerRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerRoles to fetch.
     */
    orderBy?: ServerRolesOrderByWithRelationInput | ServerRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServerRoles
    **/
    _count?: true | ServerRolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServerRolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServerRolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerRolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerRolesMaxAggregateInputType
  }

  export type GetServerRolesAggregateType<T extends ServerRolesAggregateArgs> = {
        [P in keyof T & keyof AggregateServerRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServerRoles[P]>
      : GetScalarType<T[P], AggregateServerRoles[P]>
  }




  export type ServerRolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerRolesWhereInput
    orderBy?: ServerRolesOrderByWithAggregationInput | ServerRolesOrderByWithAggregationInput[]
    by: ServerRolesScalarFieldEnum[] | ServerRolesScalarFieldEnum
    having?: ServerRolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerRolesCountAggregateInputType | true
    _avg?: ServerRolesAvgAggregateInputType
    _sum?: ServerRolesSumAggregateInputType
    _min?: ServerRolesMinAggregateInputType
    _max?: ServerRolesMaxAggregateInputType
  }

  export type ServerRolesGroupByOutputType = {
    id: string
    name: string
    position: number
    serverId: string
    _count: ServerRolesCountAggregateOutputType | null
    _avg: ServerRolesAvgAggregateOutputType | null
    _sum: ServerRolesSumAggregateOutputType | null
    _min: ServerRolesMinAggregateOutputType | null
    _max: ServerRolesMaxAggregateOutputType | null
  }

  type GetServerRolesGroupByPayload<T extends ServerRolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerRolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerRolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerRolesGroupByOutputType[P]>
            : GetScalarType<T[P], ServerRolesGroupByOutputType[P]>
        }
      >
    >


  export type ServerRolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    position?: boolean
    serverId?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    members?: boolean | ServerRoles$membersArgs<ExtArgs>
    permissions?: boolean | ServerRoles$permissionsArgs<ExtArgs>
    _count?: boolean | ServerRolesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverRoles"]>

  export type ServerRolesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    position?: boolean
    serverId?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverRoles"]>

  export type ServerRolesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    position?: boolean
    serverId?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverRoles"]>

  export type ServerRolesSelectScalar = {
    id?: boolean
    name?: boolean
    position?: boolean
    serverId?: boolean
  }

  export type ServerRolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "position" | "serverId", ExtArgs["result"]["serverRoles"]>
  export type ServerRolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    members?: boolean | ServerRoles$membersArgs<ExtArgs>
    permissions?: boolean | ServerRoles$permissionsArgs<ExtArgs>
    _count?: boolean | ServerRolesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServerRolesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type ServerRolesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }

  export type $ServerRolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServerRoles"
    objects: {
      server: Prisma.$ServerPayload<ExtArgs>
      members: Prisma.$ServerMemberPayload<ExtArgs>[]
      permissions: Prisma.$ServerRolePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      position: number
      serverId: string
    }, ExtArgs["result"]["serverRoles"]>
    composites: {}
  }

  type ServerRolesGetPayload<S extends boolean | null | undefined | ServerRolesDefaultArgs> = $Result.GetResult<Prisma.$ServerRolesPayload, S>

  type ServerRolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerRolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerRolesCountAggregateInputType | true
    }

  export interface ServerRolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServerRoles'], meta: { name: 'ServerRoles' } }
    /**
     * Find zero or one ServerRoles that matches the filter.
     * @param {ServerRolesFindUniqueArgs} args - Arguments to find a ServerRoles
     * @example
     * // Get one ServerRoles
     * const serverRoles = await prisma.serverRoles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerRolesFindUniqueArgs>(args: SelectSubset<T, ServerRolesFindUniqueArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServerRoles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerRolesFindUniqueOrThrowArgs} args - Arguments to find a ServerRoles
     * @example
     * // Get one ServerRoles
     * const serverRoles = await prisma.serverRoles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerRolesFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerRolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolesFindFirstArgs} args - Arguments to find a ServerRoles
     * @example
     * // Get one ServerRoles
     * const serverRoles = await prisma.serverRoles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerRolesFindFirstArgs>(args?: SelectSubset<T, ServerRolesFindFirstArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerRoles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolesFindFirstOrThrowArgs} args - Arguments to find a ServerRoles
     * @example
     * // Get one ServerRoles
     * const serverRoles = await prisma.serverRoles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerRolesFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerRolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServerRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServerRoles
     * const serverRoles = await prisma.serverRoles.findMany()
     * 
     * // Get first 10 ServerRoles
     * const serverRoles = await prisma.serverRoles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverRolesWithIdOnly = await prisma.serverRoles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerRolesFindManyArgs>(args?: SelectSubset<T, ServerRolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServerRoles.
     * @param {ServerRolesCreateArgs} args - Arguments to create a ServerRoles.
     * @example
     * // Create one ServerRoles
     * const ServerRoles = await prisma.serverRoles.create({
     *   data: {
     *     // ... data to create a ServerRoles
     *   }
     * })
     * 
     */
    create<T extends ServerRolesCreateArgs>(args: SelectSubset<T, ServerRolesCreateArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServerRoles.
     * @param {ServerRolesCreateManyArgs} args - Arguments to create many ServerRoles.
     * @example
     * // Create many ServerRoles
     * const serverRoles = await prisma.serverRoles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerRolesCreateManyArgs>(args?: SelectSubset<T, ServerRolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServerRoles and returns the data saved in the database.
     * @param {ServerRolesCreateManyAndReturnArgs} args - Arguments to create many ServerRoles.
     * @example
     * // Create many ServerRoles
     * const serverRoles = await prisma.serverRoles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServerRoles and only return the `id`
     * const serverRolesWithIdOnly = await prisma.serverRoles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerRolesCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerRolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServerRoles.
     * @param {ServerRolesDeleteArgs} args - Arguments to delete one ServerRoles.
     * @example
     * // Delete one ServerRoles
     * const ServerRoles = await prisma.serverRoles.delete({
     *   where: {
     *     // ... filter to delete one ServerRoles
     *   }
     * })
     * 
     */
    delete<T extends ServerRolesDeleteArgs>(args: SelectSubset<T, ServerRolesDeleteArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServerRoles.
     * @param {ServerRolesUpdateArgs} args - Arguments to update one ServerRoles.
     * @example
     * // Update one ServerRoles
     * const serverRoles = await prisma.serverRoles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerRolesUpdateArgs>(args: SelectSubset<T, ServerRolesUpdateArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServerRoles.
     * @param {ServerRolesDeleteManyArgs} args - Arguments to filter ServerRoles to delete.
     * @example
     * // Delete a few ServerRoles
     * const { count } = await prisma.serverRoles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerRolesDeleteManyArgs>(args?: SelectSubset<T, ServerRolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServerRoles
     * const serverRoles = await prisma.serverRoles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerRolesUpdateManyArgs>(args: SelectSubset<T, ServerRolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerRoles and returns the data updated in the database.
     * @param {ServerRolesUpdateManyAndReturnArgs} args - Arguments to update many ServerRoles.
     * @example
     * // Update many ServerRoles
     * const serverRoles = await prisma.serverRoles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServerRoles and only return the `id`
     * const serverRolesWithIdOnly = await prisma.serverRoles.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerRolesUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerRolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServerRoles.
     * @param {ServerRolesUpsertArgs} args - Arguments to update or create a ServerRoles.
     * @example
     * // Update or create a ServerRoles
     * const serverRoles = await prisma.serverRoles.upsert({
     *   create: {
     *     // ... data to create a ServerRoles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServerRoles we want to update
     *   }
     * })
     */
    upsert<T extends ServerRolesUpsertArgs>(args: SelectSubset<T, ServerRolesUpsertArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServerRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolesCountArgs} args - Arguments to filter ServerRoles to count.
     * @example
     * // Count the number of ServerRoles
     * const count = await prisma.serverRoles.count({
     *   where: {
     *     // ... the filter for the ServerRoles we want to count
     *   }
     * })
    **/
    count<T extends ServerRolesCountArgs>(
      args?: Subset<T, ServerRolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerRolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServerRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerRolesAggregateArgs>(args: Subset<T, ServerRolesAggregateArgs>): Prisma.PrismaPromise<GetServerRolesAggregateType<T>>

    /**
     * Group by ServerRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerRolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerRolesGroupByArgs['orderBy'] }
        : { orderBy?: ServerRolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerRolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServerRoles model
   */
  readonly fields: ServerRolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServerRoles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerRolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends ServerRoles$membersArgs<ExtArgs> = {}>(args?: Subset<T, ServerRoles$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends ServerRoles$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, ServerRoles$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServerRoles model
   */
  interface ServerRolesFieldRefs {
    readonly id: FieldRef<"ServerRoles", 'String'>
    readonly name: FieldRef<"ServerRoles", 'String'>
    readonly position: FieldRef<"ServerRoles", 'Int'>
    readonly serverId: FieldRef<"ServerRoles", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ServerRoles findUnique
   */
  export type ServerRolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * Filter, which ServerRoles to fetch.
     */
    where: ServerRolesWhereUniqueInput
  }

  /**
   * ServerRoles findUniqueOrThrow
   */
  export type ServerRolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * Filter, which ServerRoles to fetch.
     */
    where: ServerRolesWhereUniqueInput
  }

  /**
   * ServerRoles findFirst
   */
  export type ServerRolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * Filter, which ServerRoles to fetch.
     */
    where?: ServerRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerRoles to fetch.
     */
    orderBy?: ServerRolesOrderByWithRelationInput | ServerRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerRoles.
     */
    cursor?: ServerRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerRoles.
     */
    distinct?: ServerRolesScalarFieldEnum | ServerRolesScalarFieldEnum[]
  }

  /**
   * ServerRoles findFirstOrThrow
   */
  export type ServerRolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * Filter, which ServerRoles to fetch.
     */
    where?: ServerRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerRoles to fetch.
     */
    orderBy?: ServerRolesOrderByWithRelationInput | ServerRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerRoles.
     */
    cursor?: ServerRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerRoles.
     */
    distinct?: ServerRolesScalarFieldEnum | ServerRolesScalarFieldEnum[]
  }

  /**
   * ServerRoles findMany
   */
  export type ServerRolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * Filter, which ServerRoles to fetch.
     */
    where?: ServerRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerRoles to fetch.
     */
    orderBy?: ServerRolesOrderByWithRelationInput | ServerRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServerRoles.
     */
    cursor?: ServerRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerRoles.
     */
    distinct?: ServerRolesScalarFieldEnum | ServerRolesScalarFieldEnum[]
  }

  /**
   * ServerRoles create
   */
  export type ServerRolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * The data needed to create a ServerRoles.
     */
    data: XOR<ServerRolesCreateInput, ServerRolesUncheckedCreateInput>
  }

  /**
   * ServerRoles createMany
   */
  export type ServerRolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServerRoles.
     */
    data: ServerRolesCreateManyInput | ServerRolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServerRoles createManyAndReturn
   */
  export type ServerRolesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * The data used to create many ServerRoles.
     */
    data: ServerRolesCreateManyInput | ServerRolesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerRoles update
   */
  export type ServerRolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * The data needed to update a ServerRoles.
     */
    data: XOR<ServerRolesUpdateInput, ServerRolesUncheckedUpdateInput>
    /**
     * Choose, which ServerRoles to update.
     */
    where: ServerRolesWhereUniqueInput
  }

  /**
   * ServerRoles updateMany
   */
  export type ServerRolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServerRoles.
     */
    data: XOR<ServerRolesUpdateManyMutationInput, ServerRolesUncheckedUpdateManyInput>
    /**
     * Filter which ServerRoles to update
     */
    where?: ServerRolesWhereInput
    /**
     * Limit how many ServerRoles to update.
     */
    limit?: number
  }

  /**
   * ServerRoles updateManyAndReturn
   */
  export type ServerRolesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * The data used to update ServerRoles.
     */
    data: XOR<ServerRolesUpdateManyMutationInput, ServerRolesUncheckedUpdateManyInput>
    /**
     * Filter which ServerRoles to update
     */
    where?: ServerRolesWhereInput
    /**
     * Limit how many ServerRoles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerRoles upsert
   */
  export type ServerRolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * The filter to search for the ServerRoles to update in case it exists.
     */
    where: ServerRolesWhereUniqueInput
    /**
     * In case the ServerRoles found by the `where` argument doesn't exist, create a new ServerRoles with this data.
     */
    create: XOR<ServerRolesCreateInput, ServerRolesUncheckedCreateInput>
    /**
     * In case the ServerRoles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerRolesUpdateInput, ServerRolesUncheckedUpdateInput>
  }

  /**
   * ServerRoles delete
   */
  export type ServerRolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
    /**
     * Filter which ServerRoles to delete.
     */
    where: ServerRolesWhereUniqueInput
  }

  /**
   * ServerRoles deleteMany
   */
  export type ServerRolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerRoles to delete
     */
    where?: ServerRolesWhereInput
    /**
     * Limit how many ServerRoles to delete.
     */
    limit?: number
  }

  /**
   * ServerRoles.members
   */
  export type ServerRoles$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    where?: ServerMemberWhereInput
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    cursor?: ServerMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * ServerRoles.permissions
   */
  export type ServerRoles$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    where?: ServerRolePermissionWhereInput
    orderBy?: ServerRolePermissionOrderByWithRelationInput | ServerRolePermissionOrderByWithRelationInput[]
    cursor?: ServerRolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerRolePermissionScalarFieldEnum | ServerRolePermissionScalarFieldEnum[]
  }

  /**
   * ServerRoles without action
   */
  export type ServerRolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRoles
     */
    select?: ServerRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRoles
     */
    omit?: ServerRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolesInclude<ExtArgs> | null
  }


  /**
   * Model ServerRolePermission
   */

  export type AggregateServerRolePermission = {
    _count: ServerRolePermissionCountAggregateOutputType | null
    _min: ServerRolePermissionMinAggregateOutputType | null
    _max: ServerRolePermissionMaxAggregateOutputType | null
  }

  export type ServerRolePermissionMinAggregateOutputType = {
    id: string | null
    roleId: string | null
    permission: $Enums.Permission | null
  }

  export type ServerRolePermissionMaxAggregateOutputType = {
    id: string | null
    roleId: string | null
    permission: $Enums.Permission | null
  }

  export type ServerRolePermissionCountAggregateOutputType = {
    id: number
    roleId: number
    permission: number
    _all: number
  }


  export type ServerRolePermissionMinAggregateInputType = {
    id?: true
    roleId?: true
    permission?: true
  }

  export type ServerRolePermissionMaxAggregateInputType = {
    id?: true
    roleId?: true
    permission?: true
  }

  export type ServerRolePermissionCountAggregateInputType = {
    id?: true
    roleId?: true
    permission?: true
    _all?: true
  }

  export type ServerRolePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerRolePermission to aggregate.
     */
    where?: ServerRolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerRolePermissions to fetch.
     */
    orderBy?: ServerRolePermissionOrderByWithRelationInput | ServerRolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerRolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerRolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerRolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServerRolePermissions
    **/
    _count?: true | ServerRolePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerRolePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerRolePermissionMaxAggregateInputType
  }

  export type GetServerRolePermissionAggregateType<T extends ServerRolePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateServerRolePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServerRolePermission[P]>
      : GetScalarType<T[P], AggregateServerRolePermission[P]>
  }




  export type ServerRolePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerRolePermissionWhereInput
    orderBy?: ServerRolePermissionOrderByWithAggregationInput | ServerRolePermissionOrderByWithAggregationInput[]
    by: ServerRolePermissionScalarFieldEnum[] | ServerRolePermissionScalarFieldEnum
    having?: ServerRolePermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerRolePermissionCountAggregateInputType | true
    _min?: ServerRolePermissionMinAggregateInputType
    _max?: ServerRolePermissionMaxAggregateInputType
  }

  export type ServerRolePermissionGroupByOutputType = {
    id: string
    roleId: string
    permission: $Enums.Permission
    _count: ServerRolePermissionCountAggregateOutputType | null
    _min: ServerRolePermissionMinAggregateOutputType | null
    _max: ServerRolePermissionMaxAggregateOutputType | null
  }

  type GetServerRolePermissionGroupByPayload<T extends ServerRolePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerRolePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerRolePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerRolePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], ServerRolePermissionGroupByOutputType[P]>
        }
      >
    >


  export type ServerRolePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roleId?: boolean
    permission?: boolean
    role?: boolean | ServerRolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverRolePermission"]>

  export type ServerRolePermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roleId?: boolean
    permission?: boolean
    role?: boolean | ServerRolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverRolePermission"]>

  export type ServerRolePermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roleId?: boolean
    permission?: boolean
    role?: boolean | ServerRolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverRolePermission"]>

  export type ServerRolePermissionSelectScalar = {
    id?: boolean
    roleId?: boolean
    permission?: boolean
  }

  export type ServerRolePermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roleId" | "permission", ExtArgs["result"]["serverRolePermission"]>
  export type ServerRolePermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | ServerRolesDefaultArgs<ExtArgs>
  }
  export type ServerRolePermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | ServerRolesDefaultArgs<ExtArgs>
  }
  export type ServerRolePermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | ServerRolesDefaultArgs<ExtArgs>
  }

  export type $ServerRolePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServerRolePermission"
    objects: {
      role: Prisma.$ServerRolesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roleId: string
      permission: $Enums.Permission
    }, ExtArgs["result"]["serverRolePermission"]>
    composites: {}
  }

  type ServerRolePermissionGetPayload<S extends boolean | null | undefined | ServerRolePermissionDefaultArgs> = $Result.GetResult<Prisma.$ServerRolePermissionPayload, S>

  type ServerRolePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerRolePermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerRolePermissionCountAggregateInputType | true
    }

  export interface ServerRolePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServerRolePermission'], meta: { name: 'ServerRolePermission' } }
    /**
     * Find zero or one ServerRolePermission that matches the filter.
     * @param {ServerRolePermissionFindUniqueArgs} args - Arguments to find a ServerRolePermission
     * @example
     * // Get one ServerRolePermission
     * const serverRolePermission = await prisma.serverRolePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerRolePermissionFindUniqueArgs>(args: SelectSubset<T, ServerRolePermissionFindUniqueArgs<ExtArgs>>): Prisma__ServerRolePermissionClient<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServerRolePermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerRolePermissionFindUniqueOrThrowArgs} args - Arguments to find a ServerRolePermission
     * @example
     * // Get one ServerRolePermission
     * const serverRolePermission = await prisma.serverRolePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerRolePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerRolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerRolePermissionClient<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerRolePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolePermissionFindFirstArgs} args - Arguments to find a ServerRolePermission
     * @example
     * // Get one ServerRolePermission
     * const serverRolePermission = await prisma.serverRolePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerRolePermissionFindFirstArgs>(args?: SelectSubset<T, ServerRolePermissionFindFirstArgs<ExtArgs>>): Prisma__ServerRolePermissionClient<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerRolePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolePermissionFindFirstOrThrowArgs} args - Arguments to find a ServerRolePermission
     * @example
     * // Get one ServerRolePermission
     * const serverRolePermission = await prisma.serverRolePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerRolePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerRolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerRolePermissionClient<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServerRolePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServerRolePermissions
     * const serverRolePermissions = await prisma.serverRolePermission.findMany()
     * 
     * // Get first 10 ServerRolePermissions
     * const serverRolePermissions = await prisma.serverRolePermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverRolePermissionWithIdOnly = await prisma.serverRolePermission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerRolePermissionFindManyArgs>(args?: SelectSubset<T, ServerRolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServerRolePermission.
     * @param {ServerRolePermissionCreateArgs} args - Arguments to create a ServerRolePermission.
     * @example
     * // Create one ServerRolePermission
     * const ServerRolePermission = await prisma.serverRolePermission.create({
     *   data: {
     *     // ... data to create a ServerRolePermission
     *   }
     * })
     * 
     */
    create<T extends ServerRolePermissionCreateArgs>(args: SelectSubset<T, ServerRolePermissionCreateArgs<ExtArgs>>): Prisma__ServerRolePermissionClient<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServerRolePermissions.
     * @param {ServerRolePermissionCreateManyArgs} args - Arguments to create many ServerRolePermissions.
     * @example
     * // Create many ServerRolePermissions
     * const serverRolePermission = await prisma.serverRolePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerRolePermissionCreateManyArgs>(args?: SelectSubset<T, ServerRolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServerRolePermissions and returns the data saved in the database.
     * @param {ServerRolePermissionCreateManyAndReturnArgs} args - Arguments to create many ServerRolePermissions.
     * @example
     * // Create many ServerRolePermissions
     * const serverRolePermission = await prisma.serverRolePermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServerRolePermissions and only return the `id`
     * const serverRolePermissionWithIdOnly = await prisma.serverRolePermission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerRolePermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerRolePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServerRolePermission.
     * @param {ServerRolePermissionDeleteArgs} args - Arguments to delete one ServerRolePermission.
     * @example
     * // Delete one ServerRolePermission
     * const ServerRolePermission = await prisma.serverRolePermission.delete({
     *   where: {
     *     // ... filter to delete one ServerRolePermission
     *   }
     * })
     * 
     */
    delete<T extends ServerRolePermissionDeleteArgs>(args: SelectSubset<T, ServerRolePermissionDeleteArgs<ExtArgs>>): Prisma__ServerRolePermissionClient<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServerRolePermission.
     * @param {ServerRolePermissionUpdateArgs} args - Arguments to update one ServerRolePermission.
     * @example
     * // Update one ServerRolePermission
     * const serverRolePermission = await prisma.serverRolePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerRolePermissionUpdateArgs>(args: SelectSubset<T, ServerRolePermissionUpdateArgs<ExtArgs>>): Prisma__ServerRolePermissionClient<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServerRolePermissions.
     * @param {ServerRolePermissionDeleteManyArgs} args - Arguments to filter ServerRolePermissions to delete.
     * @example
     * // Delete a few ServerRolePermissions
     * const { count } = await prisma.serverRolePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerRolePermissionDeleteManyArgs>(args?: SelectSubset<T, ServerRolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerRolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServerRolePermissions
     * const serverRolePermission = await prisma.serverRolePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerRolePermissionUpdateManyArgs>(args: SelectSubset<T, ServerRolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerRolePermissions and returns the data updated in the database.
     * @param {ServerRolePermissionUpdateManyAndReturnArgs} args - Arguments to update many ServerRolePermissions.
     * @example
     * // Update many ServerRolePermissions
     * const serverRolePermission = await prisma.serverRolePermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServerRolePermissions and only return the `id`
     * const serverRolePermissionWithIdOnly = await prisma.serverRolePermission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerRolePermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerRolePermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServerRolePermission.
     * @param {ServerRolePermissionUpsertArgs} args - Arguments to update or create a ServerRolePermission.
     * @example
     * // Update or create a ServerRolePermission
     * const serverRolePermission = await prisma.serverRolePermission.upsert({
     *   create: {
     *     // ... data to create a ServerRolePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServerRolePermission we want to update
     *   }
     * })
     */
    upsert<T extends ServerRolePermissionUpsertArgs>(args: SelectSubset<T, ServerRolePermissionUpsertArgs<ExtArgs>>): Prisma__ServerRolePermissionClient<$Result.GetResult<Prisma.$ServerRolePermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServerRolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolePermissionCountArgs} args - Arguments to filter ServerRolePermissions to count.
     * @example
     * // Count the number of ServerRolePermissions
     * const count = await prisma.serverRolePermission.count({
     *   where: {
     *     // ... the filter for the ServerRolePermissions we want to count
     *   }
     * })
    **/
    count<T extends ServerRolePermissionCountArgs>(
      args?: Subset<T, ServerRolePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerRolePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServerRolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerRolePermissionAggregateArgs>(args: Subset<T, ServerRolePermissionAggregateArgs>): Prisma.PrismaPromise<GetServerRolePermissionAggregateType<T>>

    /**
     * Group by ServerRolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerRolePermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerRolePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerRolePermissionGroupByArgs['orderBy'] }
        : { orderBy?: ServerRolePermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerRolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServerRolePermission model
   */
  readonly fields: ServerRolePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServerRolePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerRolePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends ServerRolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerRolesDefaultArgs<ExtArgs>>): Prisma__ServerRolesClient<$Result.GetResult<Prisma.$ServerRolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServerRolePermission model
   */
  interface ServerRolePermissionFieldRefs {
    readonly id: FieldRef<"ServerRolePermission", 'String'>
    readonly roleId: FieldRef<"ServerRolePermission", 'String'>
    readonly permission: FieldRef<"ServerRolePermission", 'Permission'>
  }
    

  // Custom InputTypes
  /**
   * ServerRolePermission findUnique
   */
  export type ServerRolePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which ServerRolePermission to fetch.
     */
    where: ServerRolePermissionWhereUniqueInput
  }

  /**
   * ServerRolePermission findUniqueOrThrow
   */
  export type ServerRolePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which ServerRolePermission to fetch.
     */
    where: ServerRolePermissionWhereUniqueInput
  }

  /**
   * ServerRolePermission findFirst
   */
  export type ServerRolePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which ServerRolePermission to fetch.
     */
    where?: ServerRolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerRolePermissions to fetch.
     */
    orderBy?: ServerRolePermissionOrderByWithRelationInput | ServerRolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerRolePermissions.
     */
    cursor?: ServerRolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerRolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerRolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerRolePermissions.
     */
    distinct?: ServerRolePermissionScalarFieldEnum | ServerRolePermissionScalarFieldEnum[]
  }

  /**
   * ServerRolePermission findFirstOrThrow
   */
  export type ServerRolePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which ServerRolePermission to fetch.
     */
    where?: ServerRolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerRolePermissions to fetch.
     */
    orderBy?: ServerRolePermissionOrderByWithRelationInput | ServerRolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerRolePermissions.
     */
    cursor?: ServerRolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerRolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerRolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerRolePermissions.
     */
    distinct?: ServerRolePermissionScalarFieldEnum | ServerRolePermissionScalarFieldEnum[]
  }

  /**
   * ServerRolePermission findMany
   */
  export type ServerRolePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which ServerRolePermissions to fetch.
     */
    where?: ServerRolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerRolePermissions to fetch.
     */
    orderBy?: ServerRolePermissionOrderByWithRelationInput | ServerRolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServerRolePermissions.
     */
    cursor?: ServerRolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerRolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerRolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerRolePermissions.
     */
    distinct?: ServerRolePermissionScalarFieldEnum | ServerRolePermissionScalarFieldEnum[]
  }

  /**
   * ServerRolePermission create
   */
  export type ServerRolePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a ServerRolePermission.
     */
    data: XOR<ServerRolePermissionCreateInput, ServerRolePermissionUncheckedCreateInput>
  }

  /**
   * ServerRolePermission createMany
   */
  export type ServerRolePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServerRolePermissions.
     */
    data: ServerRolePermissionCreateManyInput | ServerRolePermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServerRolePermission createManyAndReturn
   */
  export type ServerRolePermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * The data used to create many ServerRolePermissions.
     */
    data: ServerRolePermissionCreateManyInput | ServerRolePermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerRolePermission update
   */
  export type ServerRolePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a ServerRolePermission.
     */
    data: XOR<ServerRolePermissionUpdateInput, ServerRolePermissionUncheckedUpdateInput>
    /**
     * Choose, which ServerRolePermission to update.
     */
    where: ServerRolePermissionWhereUniqueInput
  }

  /**
   * ServerRolePermission updateMany
   */
  export type ServerRolePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServerRolePermissions.
     */
    data: XOR<ServerRolePermissionUpdateManyMutationInput, ServerRolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which ServerRolePermissions to update
     */
    where?: ServerRolePermissionWhereInput
    /**
     * Limit how many ServerRolePermissions to update.
     */
    limit?: number
  }

  /**
   * ServerRolePermission updateManyAndReturn
   */
  export type ServerRolePermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * The data used to update ServerRolePermissions.
     */
    data: XOR<ServerRolePermissionUpdateManyMutationInput, ServerRolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which ServerRolePermissions to update
     */
    where?: ServerRolePermissionWhereInput
    /**
     * Limit how many ServerRolePermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerRolePermission upsert
   */
  export type ServerRolePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the ServerRolePermission to update in case it exists.
     */
    where: ServerRolePermissionWhereUniqueInput
    /**
     * In case the ServerRolePermission found by the `where` argument doesn't exist, create a new ServerRolePermission with this data.
     */
    create: XOR<ServerRolePermissionCreateInput, ServerRolePermissionUncheckedCreateInput>
    /**
     * In case the ServerRolePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerRolePermissionUpdateInput, ServerRolePermissionUncheckedUpdateInput>
  }

  /**
   * ServerRolePermission delete
   */
  export type ServerRolePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
    /**
     * Filter which ServerRolePermission to delete.
     */
    where: ServerRolePermissionWhereUniqueInput
  }

  /**
   * ServerRolePermission deleteMany
   */
  export type ServerRolePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerRolePermissions to delete
     */
    where?: ServerRolePermissionWhereInput
    /**
     * Limit how many ServerRolePermissions to delete.
     */
    limit?: number
  }

  /**
   * ServerRolePermission without action
   */
  export type ServerRolePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerRolePermission
     */
    select?: ServerRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerRolePermission
     */
    omit?: ServerRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerRolePermissionInclude<ExtArgs> | null
  }


  /**
   * Model Messages
   */

  export type AggregateMessages = {
    _count: MessagesCountAggregateOutputType | null
    _min: MessagesMinAggregateOutputType | null
    _max: MessagesMaxAggregateOutputType | null
  }

  export type MessagesMinAggregateOutputType = {
    id: string | null
    content: string | null
    channelId: string | null
    authorId: string | null
    createdAt: Date | null
    pinned: boolean | null
  }

  export type MessagesMaxAggregateOutputType = {
    id: string | null
    content: string | null
    channelId: string | null
    authorId: string | null
    createdAt: Date | null
    pinned: boolean | null
  }

  export type MessagesCountAggregateOutputType = {
    id: number
    content: number
    channelId: number
    authorId: number
    createdAt: number
    pinned: number
    _all: number
  }


  export type MessagesMinAggregateInputType = {
    id?: true
    content?: true
    channelId?: true
    authorId?: true
    createdAt?: true
    pinned?: true
  }

  export type MessagesMaxAggregateInputType = {
    id?: true
    content?: true
    channelId?: true
    authorId?: true
    createdAt?: true
    pinned?: true
  }

  export type MessagesCountAggregateInputType = {
    id?: true
    content?: true
    channelId?: true
    authorId?: true
    createdAt?: true
    pinned?: true
    _all?: true
  }

  export type MessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to aggregate.
     */
    where?: MessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessagesOrderByWithRelationInput | MessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessagesMaxAggregateInputType
  }

  export type GetMessagesAggregateType<T extends MessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessages[P]>
      : GetScalarType<T[P], AggregateMessages[P]>
  }




  export type MessagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessagesWhereInput
    orderBy?: MessagesOrderByWithAggregationInput | MessagesOrderByWithAggregationInput[]
    by: MessagesScalarFieldEnum[] | MessagesScalarFieldEnum
    having?: MessagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessagesCountAggregateInputType | true
    _min?: MessagesMinAggregateInputType
    _max?: MessagesMaxAggregateInputType
  }

  export type MessagesGroupByOutputType = {
    id: string
    content: string
    channelId: string
    authorId: string
    createdAt: Date
    pinned: boolean
    _count: MessagesCountAggregateOutputType | null
    _min: MessagesMinAggregateOutputType | null
    _max: MessagesMaxAggregateOutputType | null
  }

  type GetMessagesGroupByPayload<T extends MessagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessagesGroupByOutputType[P]>
            : GetScalarType<T[P], MessagesGroupByOutputType[P]>
        }
      >
    >


  export type MessagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    channelId?: boolean
    authorId?: boolean
    createdAt?: boolean
    pinned?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type MessagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    channelId?: boolean
    authorId?: boolean
    createdAt?: boolean
    pinned?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type MessagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    channelId?: boolean
    authorId?: boolean
    createdAt?: boolean
    pinned?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type MessagesSelectScalar = {
    id?: boolean
    content?: boolean
    channelId?: boolean
    authorId?: boolean
    createdAt?: boolean
    pinned?: boolean
  }

  export type MessagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "channelId" | "authorId" | "createdAt" | "pinned", ExtArgs["result"]["messages"]>
  export type MessagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Messages"
    objects: {
      channel: Prisma.$ChannelPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      channelId: string
      authorId: string
      createdAt: Date
      pinned: boolean
    }, ExtArgs["result"]["messages"]>
    composites: {}
  }

  type MessagesGetPayload<S extends boolean | null | undefined | MessagesDefaultArgs> = $Result.GetResult<Prisma.$MessagesPayload, S>

  type MessagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessagesCountAggregateInputType | true
    }

  export interface MessagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Messages'], meta: { name: 'Messages' } }
    /**
     * Find zero or one Messages that matches the filter.
     * @param {MessagesFindUniqueArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessagesFindUniqueArgs>(args: SelectSubset<T, MessagesFindUniqueArgs<ExtArgs>>): Prisma__MessagesClient<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Messages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessagesFindUniqueOrThrowArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessagesFindUniqueOrThrowArgs>(args: SelectSubset<T, MessagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessagesClient<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesFindFirstArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessagesFindFirstArgs>(args?: SelectSubset<T, MessagesFindFirstArgs<ExtArgs>>): Prisma__MessagesClient<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Messages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesFindFirstOrThrowArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessagesFindFirstOrThrowArgs>(args?: SelectSubset<T, MessagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessagesClient<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.messages.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.messages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messagesWithIdOnly = await prisma.messages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessagesFindManyArgs>(args?: SelectSubset<T, MessagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Messages.
     * @param {MessagesCreateArgs} args - Arguments to create a Messages.
     * @example
     * // Create one Messages
     * const Messages = await prisma.messages.create({
     *   data: {
     *     // ... data to create a Messages
     *   }
     * })
     * 
     */
    create<T extends MessagesCreateArgs>(args: SelectSubset<T, MessagesCreateArgs<ExtArgs>>): Prisma__MessagesClient<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessagesCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const messages = await prisma.messages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessagesCreateManyArgs>(args?: SelectSubset<T, MessagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessagesCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const messages = await prisma.messages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messagesWithIdOnly = await prisma.messages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessagesCreateManyAndReturnArgs>(args?: SelectSubset<T, MessagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Messages.
     * @param {MessagesDeleteArgs} args - Arguments to delete one Messages.
     * @example
     * // Delete one Messages
     * const Messages = await prisma.messages.delete({
     *   where: {
     *     // ... filter to delete one Messages
     *   }
     * })
     * 
     */
    delete<T extends MessagesDeleteArgs>(args: SelectSubset<T, MessagesDeleteArgs<ExtArgs>>): Prisma__MessagesClient<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Messages.
     * @param {MessagesUpdateArgs} args - Arguments to update one Messages.
     * @example
     * // Update one Messages
     * const messages = await prisma.messages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessagesUpdateArgs>(args: SelectSubset<T, MessagesUpdateArgs<ExtArgs>>): Prisma__MessagesClient<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessagesDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.messages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessagesDeleteManyArgs>(args?: SelectSubset<T, MessagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const messages = await prisma.messages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessagesUpdateManyArgs>(args: SelectSubset<T, MessagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessagesUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const messages = await prisma.messages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messagesWithIdOnly = await prisma.messages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessagesUpdateManyAndReturnArgs>(args: SelectSubset<T, MessagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Messages.
     * @param {MessagesUpsertArgs} args - Arguments to update or create a Messages.
     * @example
     * // Update or create a Messages
     * const messages = await prisma.messages.upsert({
     *   create: {
     *     // ... data to create a Messages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Messages we want to update
     *   }
     * })
     */
    upsert<T extends MessagesUpsertArgs>(args: SelectSubset<T, MessagesUpsertArgs<ExtArgs>>): Prisma__MessagesClient<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.messages.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessagesCountArgs>(
      args?: Subset<T, MessagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessagesAggregateArgs>(args: Subset<T, MessagesAggregateArgs>): Prisma.PrismaPromise<GetMessagesAggregateType<T>>

    /**
     * Group by Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessagesGroupByArgs['orderBy'] }
        : { orderBy?: MessagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Messages model
   */
  readonly fields: MessagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Messages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    channel<T extends ChannelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChannelDefaultArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Messages model
   */
  interface MessagesFieldRefs {
    readonly id: FieldRef<"Messages", 'String'>
    readonly content: FieldRef<"Messages", 'String'>
    readonly channelId: FieldRef<"Messages", 'String'>
    readonly authorId: FieldRef<"Messages", 'String'>
    readonly createdAt: FieldRef<"Messages", 'DateTime'>
    readonly pinned: FieldRef<"Messages", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Messages findUnique
   */
  export type MessagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where: MessagesWhereUniqueInput
  }

  /**
   * Messages findUniqueOrThrow
   */
  export type MessagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where: MessagesWhereUniqueInput
  }

  /**
   * Messages findFirst
   */
  export type MessagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessagesOrderByWithRelationInput | MessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * Messages findFirstOrThrow
   */
  export type MessagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessagesOrderByWithRelationInput | MessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * Messages findMany
   */
  export type MessagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessagesOrderByWithRelationInput | MessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * Messages create
   */
  export type MessagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * The data needed to create a Messages.
     */
    data: XOR<MessagesCreateInput, MessagesUncheckedCreateInput>
  }

  /**
   * Messages createMany
   */
  export type MessagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessagesCreateManyInput | MessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Messages createManyAndReturn
   */
  export type MessagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessagesCreateManyInput | MessagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Messages update
   */
  export type MessagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * The data needed to update a Messages.
     */
    data: XOR<MessagesUpdateInput, MessagesUncheckedUpdateInput>
    /**
     * Choose, which Messages to update.
     */
    where: MessagesWhereUniqueInput
  }

  /**
   * Messages updateMany
   */
  export type MessagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessagesUpdateManyMutationInput, MessagesUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessagesWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Messages updateManyAndReturn
   */
  export type MessagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessagesUpdateManyMutationInput, MessagesUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessagesWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Messages upsert
   */
  export type MessagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * The filter to search for the Messages to update in case it exists.
     */
    where: MessagesWhereUniqueInput
    /**
     * In case the Messages found by the `where` argument doesn't exist, create a new Messages with this data.
     */
    create: XOR<MessagesCreateInput, MessagesUncheckedCreateInput>
    /**
     * In case the Messages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessagesUpdateInput, MessagesUncheckedUpdateInput>
  }

  /**
   * Messages delete
   */
  export type MessagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    /**
     * Filter which Messages to delete.
     */
    where: MessagesWhereUniqueInput
  }

  /**
   * Messages deleteMany
   */
  export type MessagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessagesWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Messages without action
   */
  export type MessagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
  }


  /**
   * Model ServerInvite
   */

  export type AggregateServerInvite = {
    _count: ServerInviteCountAggregateOutputType | null
    _avg: ServerInviteAvgAggregateOutputType | null
    _sum: ServerInviteSumAggregateOutputType | null
    _min: ServerInviteMinAggregateOutputType | null
    _max: ServerInviteMaxAggregateOutputType | null
  }

  export type ServerInviteAvgAggregateOutputType = {
    maxUses: number | null
    currentUses: number | null
  }

  export type ServerInviteSumAggregateOutputType = {
    maxUses: number | null
    currentUses: number | null
  }

  export type ServerInviteMinAggregateOutputType = {
    id: string | null
    code: string | null
    serverId: string | null
    creatorId: string | null
    expiresAt: Date | null
    maxUses: number | null
    currentUses: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServerInviteMaxAggregateOutputType = {
    id: string | null
    code: string | null
    serverId: string | null
    creatorId: string | null
    expiresAt: Date | null
    maxUses: number | null
    currentUses: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServerInviteCountAggregateOutputType = {
    id: number
    code: number
    serverId: number
    creatorId: number
    expiresAt: number
    maxUses: number
    currentUses: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServerInviteAvgAggregateInputType = {
    maxUses?: true
    currentUses?: true
  }

  export type ServerInviteSumAggregateInputType = {
    maxUses?: true
    currentUses?: true
  }

  export type ServerInviteMinAggregateInputType = {
    id?: true
    code?: true
    serverId?: true
    creatorId?: true
    expiresAt?: true
    maxUses?: true
    currentUses?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServerInviteMaxAggregateInputType = {
    id?: true
    code?: true
    serverId?: true
    creatorId?: true
    expiresAt?: true
    maxUses?: true
    currentUses?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServerInviteCountAggregateInputType = {
    id?: true
    code?: true
    serverId?: true
    creatorId?: true
    expiresAt?: true
    maxUses?: true
    currentUses?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServerInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerInvite to aggregate.
     */
    where?: ServerInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerInvites to fetch.
     */
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServerInvites
    **/
    _count?: true | ServerInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServerInviteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServerInviteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerInviteMaxAggregateInputType
  }

  export type GetServerInviteAggregateType<T extends ServerInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateServerInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServerInvite[P]>
      : GetScalarType<T[P], AggregateServerInvite[P]>
  }




  export type ServerInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerInviteWhereInput
    orderBy?: ServerInviteOrderByWithAggregationInput | ServerInviteOrderByWithAggregationInput[]
    by: ServerInviteScalarFieldEnum[] | ServerInviteScalarFieldEnum
    having?: ServerInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerInviteCountAggregateInputType | true
    _avg?: ServerInviteAvgAggregateInputType
    _sum?: ServerInviteSumAggregateInputType
    _min?: ServerInviteMinAggregateInputType
    _max?: ServerInviteMaxAggregateInputType
  }

  export type ServerInviteGroupByOutputType = {
    id: string
    code: string
    serverId: string
    creatorId: string | null
    expiresAt: Date | null
    maxUses: number | null
    currentUses: number
    createdAt: Date
    updatedAt: Date
    _count: ServerInviteCountAggregateOutputType | null
    _avg: ServerInviteAvgAggregateOutputType | null
    _sum: ServerInviteSumAggregateOutputType | null
    _min: ServerInviteMinAggregateOutputType | null
    _max: ServerInviteMaxAggregateOutputType | null
  }

  type GetServerInviteGroupByPayload<T extends ServerInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerInviteGroupByOutputType[P]>
            : GetScalarType<T[P], ServerInviteGroupByOutputType[P]>
        }
      >
    >


  export type ServerInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    serverId?: boolean
    creatorId?: boolean
    expiresAt?: boolean
    maxUses?: boolean
    currentUses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    creator?: boolean | ServerInvite$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["serverInvite"]>

  export type ServerInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    serverId?: boolean
    creatorId?: boolean
    expiresAt?: boolean
    maxUses?: boolean
    currentUses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    creator?: boolean | ServerInvite$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["serverInvite"]>

  export type ServerInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    serverId?: boolean
    creatorId?: boolean
    expiresAt?: boolean
    maxUses?: boolean
    currentUses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    creator?: boolean | ServerInvite$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["serverInvite"]>

  export type ServerInviteSelectScalar = {
    id?: boolean
    code?: boolean
    serverId?: boolean
    creatorId?: boolean
    expiresAt?: boolean
    maxUses?: boolean
    currentUses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServerInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "serverId" | "creatorId" | "expiresAt" | "maxUses" | "currentUses" | "createdAt" | "updatedAt", ExtArgs["result"]["serverInvite"]>
  export type ServerInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    creator?: boolean | ServerInvite$creatorArgs<ExtArgs>
  }
  export type ServerInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    creator?: boolean | ServerInvite$creatorArgs<ExtArgs>
  }
  export type ServerInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    creator?: boolean | ServerInvite$creatorArgs<ExtArgs>
  }

  export type $ServerInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServerInvite"
    objects: {
      server: Prisma.$ServerPayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      serverId: string
      creatorId: string | null
      expiresAt: Date | null
      maxUses: number | null
      currentUses: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serverInvite"]>
    composites: {}
  }

  type ServerInviteGetPayload<S extends boolean | null | undefined | ServerInviteDefaultArgs> = $Result.GetResult<Prisma.$ServerInvitePayload, S>

  type ServerInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerInviteCountAggregateInputType | true
    }

  export interface ServerInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServerInvite'], meta: { name: 'ServerInvite' } }
    /**
     * Find zero or one ServerInvite that matches the filter.
     * @param {ServerInviteFindUniqueArgs} args - Arguments to find a ServerInvite
     * @example
     * // Get one ServerInvite
     * const serverInvite = await prisma.serverInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerInviteFindUniqueArgs>(args: SelectSubset<T, ServerInviteFindUniqueArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServerInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerInviteFindUniqueOrThrowArgs} args - Arguments to find a ServerInvite
     * @example
     * // Get one ServerInvite
     * const serverInvite = await prisma.serverInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteFindFirstArgs} args - Arguments to find a ServerInvite
     * @example
     * // Get one ServerInvite
     * const serverInvite = await prisma.serverInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerInviteFindFirstArgs>(args?: SelectSubset<T, ServerInviteFindFirstArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteFindFirstOrThrowArgs} args - Arguments to find a ServerInvite
     * @example
     * // Get one ServerInvite
     * const serverInvite = await prisma.serverInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServerInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServerInvites
     * const serverInvites = await prisma.serverInvite.findMany()
     * 
     * // Get first 10 ServerInvites
     * const serverInvites = await prisma.serverInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverInviteWithIdOnly = await prisma.serverInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerInviteFindManyArgs>(args?: SelectSubset<T, ServerInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServerInvite.
     * @param {ServerInviteCreateArgs} args - Arguments to create a ServerInvite.
     * @example
     * // Create one ServerInvite
     * const ServerInvite = await prisma.serverInvite.create({
     *   data: {
     *     // ... data to create a ServerInvite
     *   }
     * })
     * 
     */
    create<T extends ServerInviteCreateArgs>(args: SelectSubset<T, ServerInviteCreateArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServerInvites.
     * @param {ServerInviteCreateManyArgs} args - Arguments to create many ServerInvites.
     * @example
     * // Create many ServerInvites
     * const serverInvite = await prisma.serverInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerInviteCreateManyArgs>(args?: SelectSubset<T, ServerInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServerInvites and returns the data saved in the database.
     * @param {ServerInviteCreateManyAndReturnArgs} args - Arguments to create many ServerInvites.
     * @example
     * // Create many ServerInvites
     * const serverInvite = await prisma.serverInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServerInvites and only return the `id`
     * const serverInviteWithIdOnly = await prisma.serverInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServerInvite.
     * @param {ServerInviteDeleteArgs} args - Arguments to delete one ServerInvite.
     * @example
     * // Delete one ServerInvite
     * const ServerInvite = await prisma.serverInvite.delete({
     *   where: {
     *     // ... filter to delete one ServerInvite
     *   }
     * })
     * 
     */
    delete<T extends ServerInviteDeleteArgs>(args: SelectSubset<T, ServerInviteDeleteArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServerInvite.
     * @param {ServerInviteUpdateArgs} args - Arguments to update one ServerInvite.
     * @example
     * // Update one ServerInvite
     * const serverInvite = await prisma.serverInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerInviteUpdateArgs>(args: SelectSubset<T, ServerInviteUpdateArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServerInvites.
     * @param {ServerInviteDeleteManyArgs} args - Arguments to filter ServerInvites to delete.
     * @example
     * // Delete a few ServerInvites
     * const { count } = await prisma.serverInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerInviteDeleteManyArgs>(args?: SelectSubset<T, ServerInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServerInvites
     * const serverInvite = await prisma.serverInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerInviteUpdateManyArgs>(args: SelectSubset<T, ServerInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerInvites and returns the data updated in the database.
     * @param {ServerInviteUpdateManyAndReturnArgs} args - Arguments to update many ServerInvites.
     * @example
     * // Update many ServerInvites
     * const serverInvite = await prisma.serverInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServerInvites and only return the `id`
     * const serverInviteWithIdOnly = await prisma.serverInvite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServerInvite.
     * @param {ServerInviteUpsertArgs} args - Arguments to update or create a ServerInvite.
     * @example
     * // Update or create a ServerInvite
     * const serverInvite = await prisma.serverInvite.upsert({
     *   create: {
     *     // ... data to create a ServerInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServerInvite we want to update
     *   }
     * })
     */
    upsert<T extends ServerInviteUpsertArgs>(args: SelectSubset<T, ServerInviteUpsertArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServerInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteCountArgs} args - Arguments to filter ServerInvites to count.
     * @example
     * // Count the number of ServerInvites
     * const count = await prisma.serverInvite.count({
     *   where: {
     *     // ... the filter for the ServerInvites we want to count
     *   }
     * })
    **/
    count<T extends ServerInviteCountArgs>(
      args?: Subset<T, ServerInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServerInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerInviteAggregateArgs>(args: Subset<T, ServerInviteAggregateArgs>): Prisma.PrismaPromise<GetServerInviteAggregateType<T>>

    /**
     * Group by ServerInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerInviteGroupByArgs['orderBy'] }
        : { orderBy?: ServerInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServerInvite model
   */
  readonly fields: ServerInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServerInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends ServerInvite$creatorArgs<ExtArgs> = {}>(args?: Subset<T, ServerInvite$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServerInvite model
   */
  interface ServerInviteFieldRefs {
    readonly id: FieldRef<"ServerInvite", 'String'>
    readonly code: FieldRef<"ServerInvite", 'String'>
    readonly serverId: FieldRef<"ServerInvite", 'String'>
    readonly creatorId: FieldRef<"ServerInvite", 'String'>
    readonly expiresAt: FieldRef<"ServerInvite", 'DateTime'>
    readonly maxUses: FieldRef<"ServerInvite", 'Int'>
    readonly currentUses: FieldRef<"ServerInvite", 'Int'>
    readonly createdAt: FieldRef<"ServerInvite", 'DateTime'>
    readonly updatedAt: FieldRef<"ServerInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServerInvite findUnique
   */
  export type ServerInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvite to fetch.
     */
    where: ServerInviteWhereUniqueInput
  }

  /**
   * ServerInvite findUniqueOrThrow
   */
  export type ServerInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvite to fetch.
     */
    where: ServerInviteWhereUniqueInput
  }

  /**
   * ServerInvite findFirst
   */
  export type ServerInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvite to fetch.
     */
    where?: ServerInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerInvites to fetch.
     */
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerInvites.
     */
    cursor?: ServerInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerInvites.
     */
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * ServerInvite findFirstOrThrow
   */
  export type ServerInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvite to fetch.
     */
    where?: ServerInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerInvites to fetch.
     */
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerInvites.
     */
    cursor?: ServerInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerInvites.
     */
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * ServerInvite findMany
   */
  export type ServerInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvites to fetch.
     */
    where?: ServerInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerInvites to fetch.
     */
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServerInvites.
     */
    cursor?: ServerInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerInvites.
     */
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * ServerInvite create
   */
  export type ServerInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a ServerInvite.
     */
    data: XOR<ServerInviteCreateInput, ServerInviteUncheckedCreateInput>
  }

  /**
   * ServerInvite createMany
   */
  export type ServerInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServerInvites.
     */
    data: ServerInviteCreateManyInput | ServerInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServerInvite createManyAndReturn
   */
  export type ServerInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * The data used to create many ServerInvites.
     */
    data: ServerInviteCreateManyInput | ServerInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerInvite update
   */
  export type ServerInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a ServerInvite.
     */
    data: XOR<ServerInviteUpdateInput, ServerInviteUncheckedUpdateInput>
    /**
     * Choose, which ServerInvite to update.
     */
    where: ServerInviteWhereUniqueInput
  }

  /**
   * ServerInvite updateMany
   */
  export type ServerInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServerInvites.
     */
    data: XOR<ServerInviteUpdateManyMutationInput, ServerInviteUncheckedUpdateManyInput>
    /**
     * Filter which ServerInvites to update
     */
    where?: ServerInviteWhereInput
    /**
     * Limit how many ServerInvites to update.
     */
    limit?: number
  }

  /**
   * ServerInvite updateManyAndReturn
   */
  export type ServerInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * The data used to update ServerInvites.
     */
    data: XOR<ServerInviteUpdateManyMutationInput, ServerInviteUncheckedUpdateManyInput>
    /**
     * Filter which ServerInvites to update
     */
    where?: ServerInviteWhereInput
    /**
     * Limit how many ServerInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerInvite upsert
   */
  export type ServerInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the ServerInvite to update in case it exists.
     */
    where: ServerInviteWhereUniqueInput
    /**
     * In case the ServerInvite found by the `where` argument doesn't exist, create a new ServerInvite with this data.
     */
    create: XOR<ServerInviteCreateInput, ServerInviteUncheckedCreateInput>
    /**
     * In case the ServerInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerInviteUpdateInput, ServerInviteUncheckedUpdateInput>
  }

  /**
   * ServerInvite delete
   */
  export type ServerInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter which ServerInvite to delete.
     */
    where: ServerInviteWhereUniqueInput
  }

  /**
   * ServerInvite deleteMany
   */
  export type ServerInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerInvites to delete
     */
    where?: ServerInviteWhereInput
    /**
     * Limit how many ServerInvites to delete.
     */
    limit?: number
  }

  /**
   * ServerInvite.creator
   */
  export type ServerInvite$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ServerInvite without action
   */
  export type ServerInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    channels?: boolean | User$channelsArgs<ExtArgs>
    createdInvites?: boolean | User$createdInvitesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    channels?: boolean | User$channelsArgs<ExtArgs>
    createdInvites?: boolean | User$createdInvitesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      messages: Prisma.$MessagesPayload<ExtArgs>[]
      memberships: Prisma.$ServerMemberPayload<ExtArgs>[]
      channels: Prisma.$ChannelPayload<ExtArgs>[]
      createdInvites: Prisma.$ServerInvitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    channels<T extends User$channelsArgs<ExtArgs> = {}>(args?: Subset<T, User$channelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdInvites<T extends User$createdInvitesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdInvitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Messages
     */
    select?: MessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Messages
     */
    omit?: MessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessagesInclude<ExtArgs> | null
    where?: MessagesWhereInput
    orderBy?: MessagesOrderByWithRelationInput | MessagesOrderByWithRelationInput[]
    cursor?: MessagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    where?: ServerMemberWhereInput
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    cursor?: ServerMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * User.channels
   */
  export type User$channelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    cursor?: ChannelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * User.createdInvites
   */
  export type User$createdInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    where?: ServerInviteWhereInput
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    cursor?: ServerInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ServerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    picture: 'picture',
    createdAt: 'createdAt'
  };

  export type ServerScalarFieldEnum = (typeof ServerScalarFieldEnum)[keyof typeof ServerScalarFieldEnum]


  export const ChannelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    serverId: 'serverId',
    createdAt: 'createdAt',
    type: 'type'
  };

  export type ChannelScalarFieldEnum = (typeof ChannelScalarFieldEnum)[keyof typeof ChannelScalarFieldEnum]


  export const ServerMemberScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    serverId: 'serverId',
    timeoutUntil: 'timeoutUntil'
  };

  export type ServerMemberScalarFieldEnum = (typeof ServerMemberScalarFieldEnum)[keyof typeof ServerMemberScalarFieldEnum]


  export const ServerRolesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    position: 'position',
    serverId: 'serverId'
  };

  export type ServerRolesScalarFieldEnum = (typeof ServerRolesScalarFieldEnum)[keyof typeof ServerRolesScalarFieldEnum]


  export const ServerRolePermissionScalarFieldEnum: {
    id: 'id',
    roleId: 'roleId',
    permission: 'permission'
  };

  export type ServerRolePermissionScalarFieldEnum = (typeof ServerRolePermissionScalarFieldEnum)[keyof typeof ServerRolePermissionScalarFieldEnum]


  export const MessagesScalarFieldEnum: {
    id: 'id',
    content: 'content',
    channelId: 'channelId',
    authorId: 'authorId',
    createdAt: 'createdAt',
    pinned: 'pinned'
  };

  export type MessagesScalarFieldEnum = (typeof MessagesScalarFieldEnum)[keyof typeof MessagesScalarFieldEnum]


  export const ServerInviteScalarFieldEnum: {
    id: 'id',
    code: 'code',
    serverId: 'serverId',
    creatorId: 'creatorId',
    expiresAt: 'expiresAt',
    maxUses: 'maxUses',
    currentUses: 'currentUses',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServerInviteScalarFieldEnum = (typeof ServerInviteScalarFieldEnum)[keyof typeof ServerInviteScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ChannelType'
   */
  export type EnumChannelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChannelType'>
    


  /**
   * Reference to a field of type 'ChannelType[]'
   */
  export type ListEnumChannelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChannelType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Permission'
   */
  export type EnumPermissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Permission'>
    


  /**
   * Reference to a field of type 'Permission[]'
   */
  export type ListEnumPermissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Permission[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ServerWhereInput = {
    AND?: ServerWhereInput | ServerWhereInput[]
    OR?: ServerWhereInput[]
    NOT?: ServerWhereInput | ServerWhereInput[]
    id?: StringFilter<"Server"> | string
    name?: StringFilter<"Server"> | string
    picture?: StringNullableFilter<"Server"> | string | null
    createdAt?: DateTimeFilter<"Server"> | Date | string
    channels?: ChannelListRelationFilter
    members?: ServerMemberListRelationFilter
    roles?: ServerRolesListRelationFilter
    invites?: ServerInviteListRelationFilter
  }

  export type ServerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    picture?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    channels?: ChannelOrderByRelationAggregateInput
    members?: ServerMemberOrderByRelationAggregateInput
    roles?: ServerRolesOrderByRelationAggregateInput
    invites?: ServerInviteOrderByRelationAggregateInput
  }

  export type ServerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServerWhereInput | ServerWhereInput[]
    OR?: ServerWhereInput[]
    NOT?: ServerWhereInput | ServerWhereInput[]
    name?: StringFilter<"Server"> | string
    picture?: StringNullableFilter<"Server"> | string | null
    createdAt?: DateTimeFilter<"Server"> | Date | string
    channels?: ChannelListRelationFilter
    members?: ServerMemberListRelationFilter
    roles?: ServerRolesListRelationFilter
    invites?: ServerInviteListRelationFilter
  }, "id">

  export type ServerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    picture?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ServerCountOrderByAggregateInput
    _max?: ServerMaxOrderByAggregateInput
    _min?: ServerMinOrderByAggregateInput
  }

  export type ServerScalarWhereWithAggregatesInput = {
    AND?: ServerScalarWhereWithAggregatesInput | ServerScalarWhereWithAggregatesInput[]
    OR?: ServerScalarWhereWithAggregatesInput[]
    NOT?: ServerScalarWhereWithAggregatesInput | ServerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Server"> | string
    name?: StringWithAggregatesFilter<"Server"> | string
    picture?: StringNullableWithAggregatesFilter<"Server"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Server"> | Date | string
  }

  export type ChannelWhereInput = {
    AND?: ChannelWhereInput | ChannelWhereInput[]
    OR?: ChannelWhereInput[]
    NOT?: ChannelWhereInput | ChannelWhereInput[]
    id?: StringFilter<"Channel"> | string
    name?: StringFilter<"Channel"> | string
    serverId?: StringFilter<"Channel"> | string
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    messages?: MessagesListRelationFilter
    users?: UserListRelationFilter
  }

  export type ChannelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    server?: ServerOrderByWithRelationInput
    messages?: MessagesOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
  }

  export type ChannelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChannelWhereInput | ChannelWhereInput[]
    OR?: ChannelWhereInput[]
    NOT?: ChannelWhereInput | ChannelWhereInput[]
    name?: StringFilter<"Channel"> | string
    serverId?: StringFilter<"Channel"> | string
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    messages?: MessagesListRelationFilter
    users?: UserListRelationFilter
  }, "id">

  export type ChannelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    _count?: ChannelCountOrderByAggregateInput
    _max?: ChannelMaxOrderByAggregateInput
    _min?: ChannelMinOrderByAggregateInput
  }

  export type ChannelScalarWhereWithAggregatesInput = {
    AND?: ChannelScalarWhereWithAggregatesInput | ChannelScalarWhereWithAggregatesInput[]
    OR?: ChannelScalarWhereWithAggregatesInput[]
    NOT?: ChannelScalarWhereWithAggregatesInput | ChannelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Channel"> | string
    name?: StringWithAggregatesFilter<"Channel"> | string
    serverId?: StringWithAggregatesFilter<"Channel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Channel"> | Date | string
    type?: EnumChannelTypeWithAggregatesFilter<"Channel"> | $Enums.ChannelType
  }

  export type ServerMemberWhereInput = {
    AND?: ServerMemberWhereInput | ServerMemberWhereInput[]
    OR?: ServerMemberWhereInput[]
    NOT?: ServerMemberWhereInput | ServerMemberWhereInput[]
    id?: StringFilter<"ServerMember"> | string
    userId?: StringFilter<"ServerMember"> | string
    serverId?: StringFilter<"ServerMember"> | string
    timeoutUntil?: DateTimeNullableFilter<"ServerMember"> | Date | string | null
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    serverRoles?: ServerRolesListRelationFilter
  }

  export type ServerMemberOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    timeoutUntil?: SortOrderInput | SortOrder
    server?: ServerOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    serverRoles?: ServerRolesOrderByRelationAggregateInput
  }

  export type ServerMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServerMemberWhereInput | ServerMemberWhereInput[]
    OR?: ServerMemberWhereInput[]
    NOT?: ServerMemberWhereInput | ServerMemberWhereInput[]
    userId?: StringFilter<"ServerMember"> | string
    serverId?: StringFilter<"ServerMember"> | string
    timeoutUntil?: DateTimeNullableFilter<"ServerMember"> | Date | string | null
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    serverRoles?: ServerRolesListRelationFilter
  }, "id">

  export type ServerMemberOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    timeoutUntil?: SortOrderInput | SortOrder
    _count?: ServerMemberCountOrderByAggregateInput
    _max?: ServerMemberMaxOrderByAggregateInput
    _min?: ServerMemberMinOrderByAggregateInput
  }

  export type ServerMemberScalarWhereWithAggregatesInput = {
    AND?: ServerMemberScalarWhereWithAggregatesInput | ServerMemberScalarWhereWithAggregatesInput[]
    OR?: ServerMemberScalarWhereWithAggregatesInput[]
    NOT?: ServerMemberScalarWhereWithAggregatesInput | ServerMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServerMember"> | string
    userId?: StringWithAggregatesFilter<"ServerMember"> | string
    serverId?: StringWithAggregatesFilter<"ServerMember"> | string
    timeoutUntil?: DateTimeNullableWithAggregatesFilter<"ServerMember"> | Date | string | null
  }

  export type ServerRolesWhereInput = {
    AND?: ServerRolesWhereInput | ServerRolesWhereInput[]
    OR?: ServerRolesWhereInput[]
    NOT?: ServerRolesWhereInput | ServerRolesWhereInput[]
    id?: StringFilter<"ServerRoles"> | string
    name?: StringFilter<"ServerRoles"> | string
    position?: IntFilter<"ServerRoles"> | number
    serverId?: StringFilter<"ServerRoles"> | string
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    members?: ServerMemberListRelationFilter
    permissions?: ServerRolePermissionListRelationFilter
  }

  export type ServerRolesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    serverId?: SortOrder
    server?: ServerOrderByWithRelationInput
    members?: ServerMemberOrderByRelationAggregateInput
    permissions?: ServerRolePermissionOrderByRelationAggregateInput
  }

  export type ServerRolesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    serverId_name?: ServerRolesServerIdNameCompoundUniqueInput
    AND?: ServerRolesWhereInput | ServerRolesWhereInput[]
    OR?: ServerRolesWhereInput[]
    NOT?: ServerRolesWhereInput | ServerRolesWhereInput[]
    name?: StringFilter<"ServerRoles"> | string
    position?: IntFilter<"ServerRoles"> | number
    serverId?: StringFilter<"ServerRoles"> | string
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    members?: ServerMemberListRelationFilter
    permissions?: ServerRolePermissionListRelationFilter
  }, "id" | "serverId_name">

  export type ServerRolesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    serverId?: SortOrder
    _count?: ServerRolesCountOrderByAggregateInput
    _avg?: ServerRolesAvgOrderByAggregateInput
    _max?: ServerRolesMaxOrderByAggregateInput
    _min?: ServerRolesMinOrderByAggregateInput
    _sum?: ServerRolesSumOrderByAggregateInput
  }

  export type ServerRolesScalarWhereWithAggregatesInput = {
    AND?: ServerRolesScalarWhereWithAggregatesInput | ServerRolesScalarWhereWithAggregatesInput[]
    OR?: ServerRolesScalarWhereWithAggregatesInput[]
    NOT?: ServerRolesScalarWhereWithAggregatesInput | ServerRolesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServerRoles"> | string
    name?: StringWithAggregatesFilter<"ServerRoles"> | string
    position?: IntWithAggregatesFilter<"ServerRoles"> | number
    serverId?: StringWithAggregatesFilter<"ServerRoles"> | string
  }

  export type ServerRolePermissionWhereInput = {
    AND?: ServerRolePermissionWhereInput | ServerRolePermissionWhereInput[]
    OR?: ServerRolePermissionWhereInput[]
    NOT?: ServerRolePermissionWhereInput | ServerRolePermissionWhereInput[]
    id?: StringFilter<"ServerRolePermission"> | string
    roleId?: StringFilter<"ServerRolePermission"> | string
    permission?: EnumPermissionFilter<"ServerRolePermission"> | $Enums.Permission
    role?: XOR<ServerRolesScalarRelationFilter, ServerRolesWhereInput>
  }

  export type ServerRolePermissionOrderByWithRelationInput = {
    id?: SortOrder
    roleId?: SortOrder
    permission?: SortOrder
    role?: ServerRolesOrderByWithRelationInput
  }

  export type ServerRolePermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roleId_permission?: ServerRolePermissionRoleIdPermissionCompoundUniqueInput
    AND?: ServerRolePermissionWhereInput | ServerRolePermissionWhereInput[]
    OR?: ServerRolePermissionWhereInput[]
    NOT?: ServerRolePermissionWhereInput | ServerRolePermissionWhereInput[]
    roleId?: StringFilter<"ServerRolePermission"> | string
    permission?: EnumPermissionFilter<"ServerRolePermission"> | $Enums.Permission
    role?: XOR<ServerRolesScalarRelationFilter, ServerRolesWhereInput>
  }, "id" | "roleId_permission">

  export type ServerRolePermissionOrderByWithAggregationInput = {
    id?: SortOrder
    roleId?: SortOrder
    permission?: SortOrder
    _count?: ServerRolePermissionCountOrderByAggregateInput
    _max?: ServerRolePermissionMaxOrderByAggregateInput
    _min?: ServerRolePermissionMinOrderByAggregateInput
  }

  export type ServerRolePermissionScalarWhereWithAggregatesInput = {
    AND?: ServerRolePermissionScalarWhereWithAggregatesInput | ServerRolePermissionScalarWhereWithAggregatesInput[]
    OR?: ServerRolePermissionScalarWhereWithAggregatesInput[]
    NOT?: ServerRolePermissionScalarWhereWithAggregatesInput | ServerRolePermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServerRolePermission"> | string
    roleId?: StringWithAggregatesFilter<"ServerRolePermission"> | string
    permission?: EnumPermissionWithAggregatesFilter<"ServerRolePermission"> | $Enums.Permission
  }

  export type MessagesWhereInput = {
    AND?: MessagesWhereInput | MessagesWhereInput[]
    OR?: MessagesWhereInput[]
    NOT?: MessagesWhereInput | MessagesWhereInput[]
    id?: StringFilter<"Messages"> | string
    content?: StringFilter<"Messages"> | string
    channelId?: StringFilter<"Messages"> | string
    authorId?: StringFilter<"Messages"> | string
    createdAt?: DateTimeFilter<"Messages"> | Date | string
    pinned?: BoolFilter<"Messages"> | boolean
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessagesOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    pinned?: SortOrder
    channel?: ChannelOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type MessagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessagesWhereInput | MessagesWhereInput[]
    OR?: MessagesWhereInput[]
    NOT?: MessagesWhereInput | MessagesWhereInput[]
    content?: StringFilter<"Messages"> | string
    channelId?: StringFilter<"Messages"> | string
    authorId?: StringFilter<"Messages"> | string
    createdAt?: DateTimeFilter<"Messages"> | Date | string
    pinned?: BoolFilter<"Messages"> | boolean
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessagesOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    pinned?: SortOrder
    _count?: MessagesCountOrderByAggregateInput
    _max?: MessagesMaxOrderByAggregateInput
    _min?: MessagesMinOrderByAggregateInput
  }

  export type MessagesScalarWhereWithAggregatesInput = {
    AND?: MessagesScalarWhereWithAggregatesInput | MessagesScalarWhereWithAggregatesInput[]
    OR?: MessagesScalarWhereWithAggregatesInput[]
    NOT?: MessagesScalarWhereWithAggregatesInput | MessagesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Messages"> | string
    content?: StringWithAggregatesFilter<"Messages"> | string
    channelId?: StringWithAggregatesFilter<"Messages"> | string
    authorId?: StringWithAggregatesFilter<"Messages"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Messages"> | Date | string
    pinned?: BoolWithAggregatesFilter<"Messages"> | boolean
  }

  export type ServerInviteWhereInput = {
    AND?: ServerInviteWhereInput | ServerInviteWhereInput[]
    OR?: ServerInviteWhereInput[]
    NOT?: ServerInviteWhereInput | ServerInviteWhereInput[]
    id?: StringFilter<"ServerInvite"> | string
    code?: StringFilter<"ServerInvite"> | string
    serverId?: StringFilter<"ServerInvite"> | string
    creatorId?: StringNullableFilter<"ServerInvite"> | string | null
    expiresAt?: DateTimeNullableFilter<"ServerInvite"> | Date | string | null
    maxUses?: IntNullableFilter<"ServerInvite"> | number | null
    currentUses?: IntFilter<"ServerInvite"> | number
    createdAt?: DateTimeFilter<"ServerInvite"> | Date | string
    updatedAt?: DateTimeFilter<"ServerInvite"> | Date | string
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ServerInviteOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    creatorId?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    maxUses?: SortOrderInput | SortOrder
    currentUses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    server?: ServerOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
  }

  export type ServerInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ServerInviteWhereInput | ServerInviteWhereInput[]
    OR?: ServerInviteWhereInput[]
    NOT?: ServerInviteWhereInput | ServerInviteWhereInput[]
    serverId?: StringFilter<"ServerInvite"> | string
    creatorId?: StringNullableFilter<"ServerInvite"> | string | null
    expiresAt?: DateTimeNullableFilter<"ServerInvite"> | Date | string | null
    maxUses?: IntNullableFilter<"ServerInvite"> | number | null
    currentUses?: IntFilter<"ServerInvite"> | number
    createdAt?: DateTimeFilter<"ServerInvite"> | Date | string
    updatedAt?: DateTimeFilter<"ServerInvite"> | Date | string
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "code">

  export type ServerInviteOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    creatorId?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    maxUses?: SortOrderInput | SortOrder
    currentUses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServerInviteCountOrderByAggregateInput
    _avg?: ServerInviteAvgOrderByAggregateInput
    _max?: ServerInviteMaxOrderByAggregateInput
    _min?: ServerInviteMinOrderByAggregateInput
    _sum?: ServerInviteSumOrderByAggregateInput
  }

  export type ServerInviteScalarWhereWithAggregatesInput = {
    AND?: ServerInviteScalarWhereWithAggregatesInput | ServerInviteScalarWhereWithAggregatesInput[]
    OR?: ServerInviteScalarWhereWithAggregatesInput[]
    NOT?: ServerInviteScalarWhereWithAggregatesInput | ServerInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServerInvite"> | string
    code?: StringWithAggregatesFilter<"ServerInvite"> | string
    serverId?: StringWithAggregatesFilter<"ServerInvite"> | string
    creatorId?: StringNullableWithAggregatesFilter<"ServerInvite"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ServerInvite"> | Date | string | null
    maxUses?: IntNullableWithAggregatesFilter<"ServerInvite"> | number | null
    currentUses?: IntWithAggregatesFilter<"ServerInvite"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ServerInvite"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServerInvite"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    messages?: MessagesListRelationFilter
    memberships?: ServerMemberListRelationFilter
    channels?: ChannelListRelationFilter
    createdInvites?: ServerInviteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    messages?: MessagesOrderByRelationAggregateInput
    memberships?: ServerMemberOrderByRelationAggregateInput
    channels?: ChannelOrderByRelationAggregateInput
    createdInvites?: ServerInviteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    messages?: MessagesListRelationFilter
    memberships?: ServerMemberListRelationFilter
    channels?: ChannelListRelationFilter
    createdInvites?: ServerInviteListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type ServerCreateInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    channels?: ChannelCreateNestedManyWithoutServerInput
    members?: ServerMemberCreateNestedManyWithoutServerInput
    roles?: ServerRolesCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    roles?: ServerRolesUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUpdateManyWithoutServerNestedInput
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    roles?: ServerRolesUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    roles?: ServerRolesUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
  }

  export type ServerCreateManyInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
  }

  export type ServerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    type: $Enums.ChannelType
    server: ServerCreateNestedOneWithoutChannelsInput
    messages?: MessagesCreateNestedManyWithoutChannelInput
    users?: UserCreateNestedManyWithoutChannelsInput
  }

  export type ChannelUncheckedCreateInput = {
    id?: string
    name: string
    serverId: string
    createdAt?: Date | string
    type: $Enums.ChannelType
    messages?: MessagesUncheckedCreateNestedManyWithoutChannelInput
    users?: UserUncheckedCreateNestedManyWithoutChannelsInput
  }

  export type ChannelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    server?: ServerUpdateOneRequiredWithoutChannelsNestedInput
    messages?: MessagesUpdateManyWithoutChannelNestedInput
    users?: UserUpdateManyWithoutChannelsNestedInput
  }

  export type ChannelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    messages?: MessagesUncheckedUpdateManyWithoutChannelNestedInput
    users?: UserUncheckedUpdateManyWithoutChannelsNestedInput
  }

  export type ChannelCreateManyInput = {
    id?: string
    name: string
    serverId: string
    createdAt?: Date | string
    type: $Enums.ChannelType
  }

  export type ChannelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
  }

  export type ChannelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
  }

  export type ServerMemberCreateInput = {
    id?: string
    timeoutUntil?: Date | string | null
    server: ServerCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutMembershipsInput
    serverRoles?: ServerRolesCreateNestedManyWithoutMembersInput
  }

  export type ServerMemberUncheckedCreateInput = {
    id?: string
    userId: string
    serverId: string
    timeoutUntil?: Date | string | null
    serverRoles?: ServerRolesUncheckedCreateNestedManyWithoutMembersInput
  }

  export type ServerMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    serverRoles?: ServerRolesUpdateManyWithoutMembersNestedInput
  }

  export type ServerMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serverRoles?: ServerRolesUncheckedUpdateManyWithoutMembersNestedInput
  }

  export type ServerMemberCreateManyInput = {
    id?: string
    userId: string
    serverId: string
    timeoutUntil?: Date | string | null
  }

  export type ServerMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServerMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServerRolesCreateInput = {
    id?: string
    name: string
    position?: number
    server: ServerCreateNestedOneWithoutRolesInput
    members?: ServerMemberCreateNestedManyWithoutServerRolesInput
    permissions?: ServerRolePermissionCreateNestedManyWithoutRoleInput
  }

  export type ServerRolesUncheckedCreateInput = {
    id?: string
    name: string
    position?: number
    serverId: string
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerRolesInput
    permissions?: ServerRolePermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type ServerRolesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    server?: ServerUpdateOneRequiredWithoutRolesNestedInput
    members?: ServerMemberUpdateManyWithoutServerRolesNestedInput
    permissions?: ServerRolePermissionUpdateManyWithoutRoleNestedInput
  }

  export type ServerRolesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    serverId?: StringFieldUpdateOperationsInput | string
    members?: ServerMemberUncheckedUpdateManyWithoutServerRolesNestedInput
    permissions?: ServerRolePermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type ServerRolesCreateManyInput = {
    id?: string
    name: string
    position?: number
    serverId: string
  }

  export type ServerRolesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type ServerRolesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    serverId?: StringFieldUpdateOperationsInput | string
  }

  export type ServerRolePermissionCreateInput = {
    id?: string
    permission: $Enums.Permission
    role: ServerRolesCreateNestedOneWithoutPermissionsInput
  }

  export type ServerRolePermissionUncheckedCreateInput = {
    id?: string
    roleId: string
    permission: $Enums.Permission
  }

  export type ServerRolePermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    role?: ServerRolesUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type ServerRolePermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
  }

  export type ServerRolePermissionCreateManyInput = {
    id?: string
    roleId: string
    permission: $Enums.Permission
  }

  export type ServerRolePermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
  }

  export type ServerRolePermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
  }

  export type MessagesCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    pinned?: boolean
    channel: ChannelCreateNestedOneWithoutMessagesInput
    author: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessagesUncheckedCreateInput = {
    id?: string
    content: string
    channelId: string
    authorId: string
    createdAt?: Date | string
    pinned?: boolean
  }

  export type MessagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessagesCreateManyInput = {
    id?: string
    content: string
    channelId: string
    authorId: string
    createdAt?: Date | string
    pinned?: boolean
  }

  export type MessagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServerInviteCreateInput = {
    id?: string
    code: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    server: ServerCreateNestedOneWithoutInvitesInput
    creator?: UserCreateNestedOneWithoutCreatedInvitesInput
  }

  export type ServerInviteUncheckedCreateInput = {
    id?: string
    code: string
    serverId: string
    creatorId?: string | null
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutInvitesNestedInput
    creator?: UserUpdateOneWithoutCreatedInvitesNestedInput
  }

  export type ServerInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    creatorId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteCreateManyInput = {
    id?: string
    code: string
    serverId: string
    creatorId?: string | null
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    creatorId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessagesCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    channels?: ChannelCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessagesUncheckedCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    channels?: ChannelUncheckedCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessagesUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    channels?: ChannelUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessagesUncheckedUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChannelListRelationFilter = {
    every?: ChannelWhereInput
    some?: ChannelWhereInput
    none?: ChannelWhereInput
  }

  export type ServerMemberListRelationFilter = {
    every?: ServerMemberWhereInput
    some?: ServerMemberWhereInput
    none?: ServerMemberWhereInput
  }

  export type ServerRolesListRelationFilter = {
    every?: ServerRolesWhereInput
    some?: ServerRolesWhereInput
    none?: ServerRolesWhereInput
  }

  export type ServerInviteListRelationFilter = {
    every?: ServerInviteWhereInput
    some?: ServerInviteWhereInput
    none?: ServerInviteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ChannelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerRolesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    picture?: SortOrder
    createdAt?: SortOrder
  }

  export type ServerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    picture?: SortOrder
    createdAt?: SortOrder
  }

  export type ServerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    picture?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumChannelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeFilter<$PrismaModel> | $Enums.ChannelType
  }

  export type ServerScalarRelationFilter = {
    is?: ServerWhereInput
    isNot?: ServerWhereInput
  }

  export type MessagesListRelationFilter = {
    every?: MessagesWhereInput
    some?: MessagesWhereInput
    none?: MessagesWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type MessagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChannelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
  }

  export type ChannelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
  }

  export type ChannelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
  }

  export type EnumChannelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChannelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChannelTypeFilter<$PrismaModel>
    _max?: NestedEnumChannelTypeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ServerMemberCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    timeoutUntil?: SortOrder
  }

  export type ServerMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    timeoutUntil?: SortOrder
  }

  export type ServerMemberMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    timeoutUntil?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ServerRolePermissionListRelationFilter = {
    every?: ServerRolePermissionWhereInput
    some?: ServerRolePermissionWhereInput
    none?: ServerRolePermissionWhereInput
  }

  export type ServerRolePermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerRolesServerIdNameCompoundUniqueInput = {
    serverId: string
    name: string
  }

  export type ServerRolesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    serverId?: SortOrder
  }

  export type ServerRolesAvgOrderByAggregateInput = {
    position?: SortOrder
  }

  export type ServerRolesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    serverId?: SortOrder
  }

  export type ServerRolesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    serverId?: SortOrder
  }

  export type ServerRolesSumOrderByAggregateInput = {
    position?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumPermissionFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionFilter<$PrismaModel> | $Enums.Permission
  }

  export type ServerRolesScalarRelationFilter = {
    is?: ServerRolesWhereInput
    isNot?: ServerRolesWhereInput
  }

  export type ServerRolePermissionRoleIdPermissionCompoundUniqueInput = {
    roleId: string
    permission: $Enums.Permission
  }

  export type ServerRolePermissionCountOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    permission?: SortOrder
  }

  export type ServerRolePermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    permission?: SortOrder
  }

  export type ServerRolePermissionMinOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    permission?: SortOrder
  }

  export type EnumPermissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionWithAggregatesFilter<$PrismaModel> | $Enums.Permission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPermissionFilter<$PrismaModel>
    _max?: NestedEnumPermissionFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ChannelScalarRelationFilter = {
    is?: ChannelWhereInput
    isNot?: ChannelWhereInput
  }

  export type MessagesCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    pinned?: SortOrder
  }

  export type MessagesMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    pinned?: SortOrder
  }

  export type MessagesMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    pinned?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ServerInviteCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    creatorId?: SortOrder
    expiresAt?: SortOrder
    maxUses?: SortOrder
    currentUses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServerInviteAvgOrderByAggregateInput = {
    maxUses?: SortOrder
    currentUses?: SortOrder
  }

  export type ServerInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    creatorId?: SortOrder
    expiresAt?: SortOrder
    maxUses?: SortOrder
    currentUses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServerInviteMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    creatorId?: SortOrder
    expiresAt?: SortOrder
    maxUses?: SortOrder
    currentUses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServerInviteSumOrderByAggregateInput = {
    maxUses?: SortOrder
    currentUses?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChannelCreateNestedManyWithoutServerInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ServerMemberCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput> | ServerMemberCreateWithoutServerInput[] | ServerMemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerInput | ServerMemberCreateOrConnectWithoutServerInput[]
    createMany?: ServerMemberCreateManyServerInputEnvelope
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ServerRolesCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerRolesCreateWithoutServerInput, ServerRolesUncheckedCreateWithoutServerInput> | ServerRolesCreateWithoutServerInput[] | ServerRolesUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerRolesCreateOrConnectWithoutServerInput | ServerRolesCreateOrConnectWithoutServerInput[]
    createMany?: ServerRolesCreateManyServerInputEnvelope
    connect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
  }

  export type ServerInviteCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput> | ServerInviteCreateWithoutServerInput[] | ServerInviteUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutServerInput | ServerInviteCreateOrConnectWithoutServerInput[]
    createMany?: ServerInviteCreateManyServerInputEnvelope
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
  }

  export type ChannelUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ServerMemberUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput> | ServerMemberCreateWithoutServerInput[] | ServerMemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerInput | ServerMemberCreateOrConnectWithoutServerInput[]
    createMany?: ServerMemberCreateManyServerInputEnvelope
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ServerRolesUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerRolesCreateWithoutServerInput, ServerRolesUncheckedCreateWithoutServerInput> | ServerRolesCreateWithoutServerInput[] | ServerRolesUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerRolesCreateOrConnectWithoutServerInput | ServerRolesCreateOrConnectWithoutServerInput[]
    createMany?: ServerRolesCreateManyServerInputEnvelope
    connect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
  }

  export type ServerInviteUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput> | ServerInviteCreateWithoutServerInput[] | ServerInviteUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutServerInput | ServerInviteCreateOrConnectWithoutServerInput[]
    createMany?: ServerInviteCreateManyServerInputEnvelope
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ChannelUpdateManyWithoutServerNestedInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutServerInput | ChannelUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutServerInput | ChannelUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutServerInput | ChannelUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ServerMemberUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput> | ServerMemberCreateWithoutServerInput[] | ServerMemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerInput | ServerMemberCreateOrConnectWithoutServerInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutServerInput | ServerMemberUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerMemberCreateManyServerInputEnvelope
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutServerInput | ServerMemberUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutServerInput | ServerMemberUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ServerRolesUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerRolesCreateWithoutServerInput, ServerRolesUncheckedCreateWithoutServerInput> | ServerRolesCreateWithoutServerInput[] | ServerRolesUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerRolesCreateOrConnectWithoutServerInput | ServerRolesCreateOrConnectWithoutServerInput[]
    upsert?: ServerRolesUpsertWithWhereUniqueWithoutServerInput | ServerRolesUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerRolesCreateManyServerInputEnvelope
    set?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    disconnect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    delete?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    connect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    update?: ServerRolesUpdateWithWhereUniqueWithoutServerInput | ServerRolesUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerRolesUpdateManyWithWhereWithoutServerInput | ServerRolesUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerRolesScalarWhereInput | ServerRolesScalarWhereInput[]
  }

  export type ServerInviteUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput> | ServerInviteCreateWithoutServerInput[] | ServerInviteUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutServerInput | ServerInviteCreateOrConnectWithoutServerInput[]
    upsert?: ServerInviteUpsertWithWhereUniqueWithoutServerInput | ServerInviteUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerInviteCreateManyServerInputEnvelope
    set?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    disconnect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    delete?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    update?: ServerInviteUpdateWithWhereUniqueWithoutServerInput | ServerInviteUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerInviteUpdateManyWithWhereWithoutServerInput | ServerInviteUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
  }

  export type ChannelUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutServerInput | ChannelUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutServerInput | ChannelUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutServerInput | ChannelUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ServerMemberUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput> | ServerMemberCreateWithoutServerInput[] | ServerMemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerInput | ServerMemberCreateOrConnectWithoutServerInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutServerInput | ServerMemberUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerMemberCreateManyServerInputEnvelope
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutServerInput | ServerMemberUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutServerInput | ServerMemberUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ServerRolesUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerRolesCreateWithoutServerInput, ServerRolesUncheckedCreateWithoutServerInput> | ServerRolesCreateWithoutServerInput[] | ServerRolesUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerRolesCreateOrConnectWithoutServerInput | ServerRolesCreateOrConnectWithoutServerInput[]
    upsert?: ServerRolesUpsertWithWhereUniqueWithoutServerInput | ServerRolesUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerRolesCreateManyServerInputEnvelope
    set?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    disconnect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    delete?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    connect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    update?: ServerRolesUpdateWithWhereUniqueWithoutServerInput | ServerRolesUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerRolesUpdateManyWithWhereWithoutServerInput | ServerRolesUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerRolesScalarWhereInput | ServerRolesScalarWhereInput[]
  }

  export type ServerInviteUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput> | ServerInviteCreateWithoutServerInput[] | ServerInviteUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutServerInput | ServerInviteCreateOrConnectWithoutServerInput[]
    upsert?: ServerInviteUpsertWithWhereUniqueWithoutServerInput | ServerInviteUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerInviteCreateManyServerInputEnvelope
    set?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    disconnect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    delete?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    update?: ServerInviteUpdateWithWhereUniqueWithoutServerInput | ServerInviteUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerInviteUpdateManyWithWhereWithoutServerInput | ServerInviteUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
  }

  export type ServerCreateNestedOneWithoutChannelsInput = {
    create?: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ServerCreateOrConnectWithoutChannelsInput
    connect?: ServerWhereUniqueInput
  }

  export type MessagesCreateNestedManyWithoutChannelInput = {
    create?: XOR<MessagesCreateWithoutChannelInput, MessagesUncheckedCreateWithoutChannelInput> | MessagesCreateWithoutChannelInput[] | MessagesUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: MessagesCreateOrConnectWithoutChannelInput | MessagesCreateOrConnectWithoutChannelInput[]
    createMany?: MessagesCreateManyChannelInputEnvelope
    connect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutChannelsInput = {
    create?: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput> | UserCreateWithoutChannelsInput[] | UserUncheckedCreateWithoutChannelsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutChannelsInput | UserCreateOrConnectWithoutChannelsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type MessagesUncheckedCreateNestedManyWithoutChannelInput = {
    create?: XOR<MessagesCreateWithoutChannelInput, MessagesUncheckedCreateWithoutChannelInput> | MessagesCreateWithoutChannelInput[] | MessagesUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: MessagesCreateOrConnectWithoutChannelInput | MessagesCreateOrConnectWithoutChannelInput[]
    createMany?: MessagesCreateManyChannelInputEnvelope
    connect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutChannelsInput = {
    create?: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput> | UserCreateWithoutChannelsInput[] | UserUncheckedCreateWithoutChannelsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutChannelsInput | UserCreateOrConnectWithoutChannelsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EnumChannelTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChannelType
  }

  export type ServerUpdateOneRequiredWithoutChannelsNestedInput = {
    create?: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ServerCreateOrConnectWithoutChannelsInput
    upsert?: ServerUpsertWithoutChannelsInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutChannelsInput, ServerUpdateWithoutChannelsInput>, ServerUncheckedUpdateWithoutChannelsInput>
  }

  export type MessagesUpdateManyWithoutChannelNestedInput = {
    create?: XOR<MessagesCreateWithoutChannelInput, MessagesUncheckedCreateWithoutChannelInput> | MessagesCreateWithoutChannelInput[] | MessagesUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: MessagesCreateOrConnectWithoutChannelInput | MessagesCreateOrConnectWithoutChannelInput[]
    upsert?: MessagesUpsertWithWhereUniqueWithoutChannelInput | MessagesUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: MessagesCreateManyChannelInputEnvelope
    set?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    disconnect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    delete?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    connect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    update?: MessagesUpdateWithWhereUniqueWithoutChannelInput | MessagesUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: MessagesUpdateManyWithWhereWithoutChannelInput | MessagesUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: MessagesScalarWhereInput | MessagesScalarWhereInput[]
  }

  export type UserUpdateManyWithoutChannelsNestedInput = {
    create?: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput> | UserCreateWithoutChannelsInput[] | UserUncheckedCreateWithoutChannelsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutChannelsInput | UserCreateOrConnectWithoutChannelsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutChannelsInput | UserUpsertWithWhereUniqueWithoutChannelsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutChannelsInput | UserUpdateWithWhereUniqueWithoutChannelsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutChannelsInput | UserUpdateManyWithWhereWithoutChannelsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type MessagesUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: XOR<MessagesCreateWithoutChannelInput, MessagesUncheckedCreateWithoutChannelInput> | MessagesCreateWithoutChannelInput[] | MessagesUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: MessagesCreateOrConnectWithoutChannelInput | MessagesCreateOrConnectWithoutChannelInput[]
    upsert?: MessagesUpsertWithWhereUniqueWithoutChannelInput | MessagesUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: MessagesCreateManyChannelInputEnvelope
    set?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    disconnect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    delete?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    connect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    update?: MessagesUpdateWithWhereUniqueWithoutChannelInput | MessagesUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: MessagesUpdateManyWithWhereWithoutChannelInput | MessagesUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: MessagesScalarWhereInput | MessagesScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutChannelsNestedInput = {
    create?: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput> | UserCreateWithoutChannelsInput[] | UserUncheckedCreateWithoutChannelsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutChannelsInput | UserCreateOrConnectWithoutChannelsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutChannelsInput | UserUpsertWithWhereUniqueWithoutChannelsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutChannelsInput | UserUpdateWithWhereUniqueWithoutChannelsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutChannelsInput | UserUpdateManyWithWhereWithoutChannelsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ServerCreateNestedOneWithoutMembersInput = {
    create?: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ServerCreateOrConnectWithoutMembersInput
    connect?: ServerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type ServerRolesCreateNestedManyWithoutMembersInput = {
    create?: XOR<ServerRolesCreateWithoutMembersInput, ServerRolesUncheckedCreateWithoutMembersInput> | ServerRolesCreateWithoutMembersInput[] | ServerRolesUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ServerRolesCreateOrConnectWithoutMembersInput | ServerRolesCreateOrConnectWithoutMembersInput[]
    connect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
  }

  export type ServerRolesUncheckedCreateNestedManyWithoutMembersInput = {
    create?: XOR<ServerRolesCreateWithoutMembersInput, ServerRolesUncheckedCreateWithoutMembersInput> | ServerRolesCreateWithoutMembersInput[] | ServerRolesUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ServerRolesCreateOrConnectWithoutMembersInput | ServerRolesCreateOrConnectWithoutMembersInput[]
    connect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ServerUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ServerCreateOrConnectWithoutMembersInput
    upsert?: ServerUpsertWithoutMembersInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutMembersInput, ServerUpdateWithoutMembersInput>, ServerUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type ServerRolesUpdateManyWithoutMembersNestedInput = {
    create?: XOR<ServerRolesCreateWithoutMembersInput, ServerRolesUncheckedCreateWithoutMembersInput> | ServerRolesCreateWithoutMembersInput[] | ServerRolesUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ServerRolesCreateOrConnectWithoutMembersInput | ServerRolesCreateOrConnectWithoutMembersInput[]
    upsert?: ServerRolesUpsertWithWhereUniqueWithoutMembersInput | ServerRolesUpsertWithWhereUniqueWithoutMembersInput[]
    set?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    disconnect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    delete?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    connect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    update?: ServerRolesUpdateWithWhereUniqueWithoutMembersInput | ServerRolesUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: ServerRolesUpdateManyWithWhereWithoutMembersInput | ServerRolesUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: ServerRolesScalarWhereInput | ServerRolesScalarWhereInput[]
  }

  export type ServerRolesUncheckedUpdateManyWithoutMembersNestedInput = {
    create?: XOR<ServerRolesCreateWithoutMembersInput, ServerRolesUncheckedCreateWithoutMembersInput> | ServerRolesCreateWithoutMembersInput[] | ServerRolesUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ServerRolesCreateOrConnectWithoutMembersInput | ServerRolesCreateOrConnectWithoutMembersInput[]
    upsert?: ServerRolesUpsertWithWhereUniqueWithoutMembersInput | ServerRolesUpsertWithWhereUniqueWithoutMembersInput[]
    set?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    disconnect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    delete?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    connect?: ServerRolesWhereUniqueInput | ServerRolesWhereUniqueInput[]
    update?: ServerRolesUpdateWithWhereUniqueWithoutMembersInput | ServerRolesUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: ServerRolesUpdateManyWithWhereWithoutMembersInput | ServerRolesUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: ServerRolesScalarWhereInput | ServerRolesScalarWhereInput[]
  }

  export type ServerCreateNestedOneWithoutRolesInput = {
    create?: XOR<ServerCreateWithoutRolesInput, ServerUncheckedCreateWithoutRolesInput>
    connectOrCreate?: ServerCreateOrConnectWithoutRolesInput
    connect?: ServerWhereUniqueInput
  }

  export type ServerMemberCreateNestedManyWithoutServerRolesInput = {
    create?: XOR<ServerMemberCreateWithoutServerRolesInput, ServerMemberUncheckedCreateWithoutServerRolesInput> | ServerMemberCreateWithoutServerRolesInput[] | ServerMemberUncheckedCreateWithoutServerRolesInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerRolesInput | ServerMemberCreateOrConnectWithoutServerRolesInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ServerRolePermissionCreateNestedManyWithoutRoleInput = {
    create?: XOR<ServerRolePermissionCreateWithoutRoleInput, ServerRolePermissionUncheckedCreateWithoutRoleInput> | ServerRolePermissionCreateWithoutRoleInput[] | ServerRolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: ServerRolePermissionCreateOrConnectWithoutRoleInput | ServerRolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: ServerRolePermissionCreateManyRoleInputEnvelope
    connect?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
  }

  export type ServerMemberUncheckedCreateNestedManyWithoutServerRolesInput = {
    create?: XOR<ServerMemberCreateWithoutServerRolesInput, ServerMemberUncheckedCreateWithoutServerRolesInput> | ServerMemberCreateWithoutServerRolesInput[] | ServerMemberUncheckedCreateWithoutServerRolesInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerRolesInput | ServerMemberCreateOrConnectWithoutServerRolesInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ServerRolePermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<ServerRolePermissionCreateWithoutRoleInput, ServerRolePermissionUncheckedCreateWithoutRoleInput> | ServerRolePermissionCreateWithoutRoleInput[] | ServerRolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: ServerRolePermissionCreateOrConnectWithoutRoleInput | ServerRolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: ServerRolePermissionCreateManyRoleInputEnvelope
    connect?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServerUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<ServerCreateWithoutRolesInput, ServerUncheckedCreateWithoutRolesInput>
    connectOrCreate?: ServerCreateOrConnectWithoutRolesInput
    upsert?: ServerUpsertWithoutRolesInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutRolesInput, ServerUpdateWithoutRolesInput>, ServerUncheckedUpdateWithoutRolesInput>
  }

  export type ServerMemberUpdateManyWithoutServerRolesNestedInput = {
    create?: XOR<ServerMemberCreateWithoutServerRolesInput, ServerMemberUncheckedCreateWithoutServerRolesInput> | ServerMemberCreateWithoutServerRolesInput[] | ServerMemberUncheckedCreateWithoutServerRolesInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerRolesInput | ServerMemberCreateOrConnectWithoutServerRolesInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutServerRolesInput | ServerMemberUpsertWithWhereUniqueWithoutServerRolesInput[]
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutServerRolesInput | ServerMemberUpdateWithWhereUniqueWithoutServerRolesInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutServerRolesInput | ServerMemberUpdateManyWithWhereWithoutServerRolesInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ServerRolePermissionUpdateManyWithoutRoleNestedInput = {
    create?: XOR<ServerRolePermissionCreateWithoutRoleInput, ServerRolePermissionUncheckedCreateWithoutRoleInput> | ServerRolePermissionCreateWithoutRoleInput[] | ServerRolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: ServerRolePermissionCreateOrConnectWithoutRoleInput | ServerRolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: ServerRolePermissionUpsertWithWhereUniqueWithoutRoleInput | ServerRolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: ServerRolePermissionCreateManyRoleInputEnvelope
    set?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
    disconnect?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
    delete?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
    connect?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
    update?: ServerRolePermissionUpdateWithWhereUniqueWithoutRoleInput | ServerRolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: ServerRolePermissionUpdateManyWithWhereWithoutRoleInput | ServerRolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: ServerRolePermissionScalarWhereInput | ServerRolePermissionScalarWhereInput[]
  }

  export type ServerMemberUncheckedUpdateManyWithoutServerRolesNestedInput = {
    create?: XOR<ServerMemberCreateWithoutServerRolesInput, ServerMemberUncheckedCreateWithoutServerRolesInput> | ServerMemberCreateWithoutServerRolesInput[] | ServerMemberUncheckedCreateWithoutServerRolesInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerRolesInput | ServerMemberCreateOrConnectWithoutServerRolesInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutServerRolesInput | ServerMemberUpsertWithWhereUniqueWithoutServerRolesInput[]
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutServerRolesInput | ServerMemberUpdateWithWhereUniqueWithoutServerRolesInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutServerRolesInput | ServerMemberUpdateManyWithWhereWithoutServerRolesInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ServerRolePermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<ServerRolePermissionCreateWithoutRoleInput, ServerRolePermissionUncheckedCreateWithoutRoleInput> | ServerRolePermissionCreateWithoutRoleInput[] | ServerRolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: ServerRolePermissionCreateOrConnectWithoutRoleInput | ServerRolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: ServerRolePermissionUpsertWithWhereUniqueWithoutRoleInput | ServerRolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: ServerRolePermissionCreateManyRoleInputEnvelope
    set?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
    disconnect?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
    delete?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
    connect?: ServerRolePermissionWhereUniqueInput | ServerRolePermissionWhereUniqueInput[]
    update?: ServerRolePermissionUpdateWithWhereUniqueWithoutRoleInput | ServerRolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: ServerRolePermissionUpdateManyWithWhereWithoutRoleInput | ServerRolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: ServerRolePermissionScalarWhereInput | ServerRolePermissionScalarWhereInput[]
  }

  export type ServerRolesCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<ServerRolesCreateWithoutPermissionsInput, ServerRolesUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: ServerRolesCreateOrConnectWithoutPermissionsInput
    connect?: ServerRolesWhereUniqueInput
  }

  export type EnumPermissionFieldUpdateOperationsInput = {
    set?: $Enums.Permission
  }

  export type ServerRolesUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<ServerRolesCreateWithoutPermissionsInput, ServerRolesUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: ServerRolesCreateOrConnectWithoutPermissionsInput
    upsert?: ServerRolesUpsertWithoutPermissionsInput
    connect?: ServerRolesWhereUniqueInput
    update?: XOR<XOR<ServerRolesUpdateToOneWithWhereWithoutPermissionsInput, ServerRolesUpdateWithoutPermissionsInput>, ServerRolesUncheckedUpdateWithoutPermissionsInput>
  }

  export type ChannelCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutMessagesInput
    connect?: ChannelWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ChannelUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutMessagesInput
    upsert?: ChannelUpsertWithoutMessagesInput
    connect?: ChannelWhereUniqueInput
    update?: XOR<XOR<ChannelUpdateToOneWithWhereWithoutMessagesInput, ChannelUpdateWithoutMessagesInput>, ChannelUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type ServerCreateNestedOneWithoutInvitesInput = {
    create?: XOR<ServerCreateWithoutInvitesInput, ServerUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: ServerCreateOrConnectWithoutInvitesInput
    connect?: ServerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedInvitesInput = {
    create?: XOR<UserCreateWithoutCreatedInvitesInput, UserUncheckedCreateWithoutCreatedInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedInvitesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServerUpdateOneRequiredWithoutInvitesNestedInput = {
    create?: XOR<ServerCreateWithoutInvitesInput, ServerUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: ServerCreateOrConnectWithoutInvitesInput
    upsert?: ServerUpsertWithoutInvitesInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutInvitesInput, ServerUpdateWithoutInvitesInput>, ServerUncheckedUpdateWithoutInvitesInput>
  }

  export type UserUpdateOneWithoutCreatedInvitesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedInvitesInput, UserUncheckedCreateWithoutCreatedInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedInvitesInput
    upsert?: UserUpsertWithoutCreatedInvitesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedInvitesInput, UserUpdateWithoutCreatedInvitesInput>, UserUncheckedUpdateWithoutCreatedInvitesInput>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type MessagesCreateNestedManyWithoutAuthorInput = {
    create?: XOR<MessagesCreateWithoutAuthorInput, MessagesUncheckedCreateWithoutAuthorInput> | MessagesCreateWithoutAuthorInput[] | MessagesUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessagesCreateOrConnectWithoutAuthorInput | MessagesCreateOrConnectWithoutAuthorInput[]
    createMany?: MessagesCreateManyAuthorInputEnvelope
    connect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
  }

  export type ServerMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput> | ServerMemberCreateWithoutUserInput[] | ServerMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutUserInput | ServerMemberCreateOrConnectWithoutUserInput[]
    createMany?: ServerMemberCreateManyUserInputEnvelope
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ChannelCreateNestedManyWithoutUsersInput = {
    create?: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput> | ChannelCreateWithoutUsersInput[] | ChannelUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutUsersInput | ChannelCreateOrConnectWithoutUsersInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ServerInviteCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ServerInviteCreateWithoutCreatorInput, ServerInviteUncheckedCreateWithoutCreatorInput> | ServerInviteCreateWithoutCreatorInput[] | ServerInviteUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutCreatorInput | ServerInviteCreateOrConnectWithoutCreatorInput[]
    createMany?: ServerInviteCreateManyCreatorInputEnvelope
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type MessagesUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<MessagesCreateWithoutAuthorInput, MessagesUncheckedCreateWithoutAuthorInput> | MessagesCreateWithoutAuthorInput[] | MessagesUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessagesCreateOrConnectWithoutAuthorInput | MessagesCreateOrConnectWithoutAuthorInput[]
    createMany?: MessagesCreateManyAuthorInputEnvelope
    connect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
  }

  export type ServerMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput> | ServerMemberCreateWithoutUserInput[] | ServerMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutUserInput | ServerMemberCreateOrConnectWithoutUserInput[]
    createMany?: ServerMemberCreateManyUserInputEnvelope
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ChannelUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput> | ChannelCreateWithoutUsersInput[] | ChannelUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutUsersInput | ChannelCreateOrConnectWithoutUsersInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ServerInviteUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ServerInviteCreateWithoutCreatorInput, ServerInviteUncheckedCreateWithoutCreatorInput> | ServerInviteCreateWithoutCreatorInput[] | ServerInviteUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutCreatorInput | ServerInviteCreateOrConnectWithoutCreatorInput[]
    createMany?: ServerInviteCreateManyCreatorInputEnvelope
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type MessagesUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<MessagesCreateWithoutAuthorInput, MessagesUncheckedCreateWithoutAuthorInput> | MessagesCreateWithoutAuthorInput[] | MessagesUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessagesCreateOrConnectWithoutAuthorInput | MessagesCreateOrConnectWithoutAuthorInput[]
    upsert?: MessagesUpsertWithWhereUniqueWithoutAuthorInput | MessagesUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: MessagesCreateManyAuthorInputEnvelope
    set?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    disconnect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    delete?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    connect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    update?: MessagesUpdateWithWhereUniqueWithoutAuthorInput | MessagesUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: MessagesUpdateManyWithWhereWithoutAuthorInput | MessagesUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: MessagesScalarWhereInput | MessagesScalarWhereInput[]
  }

  export type ServerMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput> | ServerMemberCreateWithoutUserInput[] | ServerMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutUserInput | ServerMemberCreateOrConnectWithoutUserInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutUserInput | ServerMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServerMemberCreateManyUserInputEnvelope
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutUserInput | ServerMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutUserInput | ServerMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ChannelUpdateManyWithoutUsersNestedInput = {
    create?: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput> | ChannelCreateWithoutUsersInput[] | ChannelUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutUsersInput | ChannelCreateOrConnectWithoutUsersInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutUsersInput | ChannelUpsertWithWhereUniqueWithoutUsersInput[]
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutUsersInput | ChannelUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutUsersInput | ChannelUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ServerInviteUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ServerInviteCreateWithoutCreatorInput, ServerInviteUncheckedCreateWithoutCreatorInput> | ServerInviteCreateWithoutCreatorInput[] | ServerInviteUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutCreatorInput | ServerInviteCreateOrConnectWithoutCreatorInput[]
    upsert?: ServerInviteUpsertWithWhereUniqueWithoutCreatorInput | ServerInviteUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ServerInviteCreateManyCreatorInputEnvelope
    set?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    disconnect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    delete?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    update?: ServerInviteUpdateWithWhereUniqueWithoutCreatorInput | ServerInviteUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ServerInviteUpdateManyWithWhereWithoutCreatorInput | ServerInviteUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type MessagesUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<MessagesCreateWithoutAuthorInput, MessagesUncheckedCreateWithoutAuthorInput> | MessagesCreateWithoutAuthorInput[] | MessagesUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessagesCreateOrConnectWithoutAuthorInput | MessagesCreateOrConnectWithoutAuthorInput[]
    upsert?: MessagesUpsertWithWhereUniqueWithoutAuthorInput | MessagesUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: MessagesCreateManyAuthorInputEnvelope
    set?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    disconnect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    delete?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    connect?: MessagesWhereUniqueInput | MessagesWhereUniqueInput[]
    update?: MessagesUpdateWithWhereUniqueWithoutAuthorInput | MessagesUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: MessagesUpdateManyWithWhereWithoutAuthorInput | MessagesUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: MessagesScalarWhereInput | MessagesScalarWhereInput[]
  }

  export type ServerMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput> | ServerMemberCreateWithoutUserInput[] | ServerMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutUserInput | ServerMemberCreateOrConnectWithoutUserInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutUserInput | ServerMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServerMemberCreateManyUserInputEnvelope
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutUserInput | ServerMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutUserInput | ServerMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ChannelUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput> | ChannelCreateWithoutUsersInput[] | ChannelUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutUsersInput | ChannelCreateOrConnectWithoutUsersInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutUsersInput | ChannelUpsertWithWhereUniqueWithoutUsersInput[]
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutUsersInput | ChannelUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutUsersInput | ChannelUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ServerInviteUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ServerInviteCreateWithoutCreatorInput, ServerInviteUncheckedCreateWithoutCreatorInput> | ServerInviteCreateWithoutCreatorInput[] | ServerInviteUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutCreatorInput | ServerInviteCreateOrConnectWithoutCreatorInput[]
    upsert?: ServerInviteUpsertWithWhereUniqueWithoutCreatorInput | ServerInviteUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ServerInviteCreateManyCreatorInputEnvelope
    set?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    disconnect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    delete?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    update?: ServerInviteUpdateWithWhereUniqueWithoutCreatorInput | ServerInviteUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ServerInviteUpdateManyWithWhereWithoutCreatorInput | ServerInviteUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumChannelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeFilter<$PrismaModel> | $Enums.ChannelType
  }

  export type NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChannelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChannelTypeFilter<$PrismaModel>
    _max?: NestedEnumChannelTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPermissionFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionFilter<$PrismaModel> | $Enums.Permission
  }

  export type NestedEnumPermissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionWithAggregatesFilter<$PrismaModel> | $Enums.Permission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPermissionFilter<$PrismaModel>
    _max?: NestedEnumPermissionFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ChannelCreateWithoutServerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    type: $Enums.ChannelType
    messages?: MessagesCreateNestedManyWithoutChannelInput
    users?: UserCreateNestedManyWithoutChannelsInput
  }

  export type ChannelUncheckedCreateWithoutServerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    type: $Enums.ChannelType
    messages?: MessagesUncheckedCreateNestedManyWithoutChannelInput
    users?: UserUncheckedCreateNestedManyWithoutChannelsInput
  }

  export type ChannelCreateOrConnectWithoutServerInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput>
  }

  export type ChannelCreateManyServerInputEnvelope = {
    data: ChannelCreateManyServerInput | ChannelCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type ServerMemberCreateWithoutServerInput = {
    id?: string
    timeoutUntil?: Date | string | null
    user: UserCreateNestedOneWithoutMembershipsInput
    serverRoles?: ServerRolesCreateNestedManyWithoutMembersInput
  }

  export type ServerMemberUncheckedCreateWithoutServerInput = {
    id?: string
    userId: string
    timeoutUntil?: Date | string | null
    serverRoles?: ServerRolesUncheckedCreateNestedManyWithoutMembersInput
  }

  export type ServerMemberCreateOrConnectWithoutServerInput = {
    where: ServerMemberWhereUniqueInput
    create: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput>
  }

  export type ServerMemberCreateManyServerInputEnvelope = {
    data: ServerMemberCreateManyServerInput | ServerMemberCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type ServerRolesCreateWithoutServerInput = {
    id?: string
    name: string
    position?: number
    members?: ServerMemberCreateNestedManyWithoutServerRolesInput
    permissions?: ServerRolePermissionCreateNestedManyWithoutRoleInput
  }

  export type ServerRolesUncheckedCreateWithoutServerInput = {
    id?: string
    name: string
    position?: number
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerRolesInput
    permissions?: ServerRolePermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type ServerRolesCreateOrConnectWithoutServerInput = {
    where: ServerRolesWhereUniqueInput
    create: XOR<ServerRolesCreateWithoutServerInput, ServerRolesUncheckedCreateWithoutServerInput>
  }

  export type ServerRolesCreateManyServerInputEnvelope = {
    data: ServerRolesCreateManyServerInput | ServerRolesCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type ServerInviteCreateWithoutServerInput = {
    id?: string
    code: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutCreatedInvitesInput
  }

  export type ServerInviteUncheckedCreateWithoutServerInput = {
    id?: string
    code: string
    creatorId?: string | null
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerInviteCreateOrConnectWithoutServerInput = {
    where: ServerInviteWhereUniqueInput
    create: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput>
  }

  export type ServerInviteCreateManyServerInputEnvelope = {
    data: ServerInviteCreateManyServerInput | ServerInviteCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type ChannelUpsertWithWhereUniqueWithoutServerInput = {
    where: ChannelWhereUniqueInput
    update: XOR<ChannelUpdateWithoutServerInput, ChannelUncheckedUpdateWithoutServerInput>
    create: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput>
  }

  export type ChannelUpdateWithWhereUniqueWithoutServerInput = {
    where: ChannelWhereUniqueInput
    data: XOR<ChannelUpdateWithoutServerInput, ChannelUncheckedUpdateWithoutServerInput>
  }

  export type ChannelUpdateManyWithWhereWithoutServerInput = {
    where: ChannelScalarWhereInput
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyWithoutServerInput>
  }

  export type ChannelScalarWhereInput = {
    AND?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
    OR?: ChannelScalarWhereInput[]
    NOT?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
    id?: StringFilter<"Channel"> | string
    name?: StringFilter<"Channel"> | string
    serverId?: StringFilter<"Channel"> | string
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
  }

  export type ServerMemberUpsertWithWhereUniqueWithoutServerInput = {
    where: ServerMemberWhereUniqueInput
    update: XOR<ServerMemberUpdateWithoutServerInput, ServerMemberUncheckedUpdateWithoutServerInput>
    create: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput>
  }

  export type ServerMemberUpdateWithWhereUniqueWithoutServerInput = {
    where: ServerMemberWhereUniqueInput
    data: XOR<ServerMemberUpdateWithoutServerInput, ServerMemberUncheckedUpdateWithoutServerInput>
  }

  export type ServerMemberUpdateManyWithWhereWithoutServerInput = {
    where: ServerMemberScalarWhereInput
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyWithoutServerInput>
  }

  export type ServerMemberScalarWhereInput = {
    AND?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
    OR?: ServerMemberScalarWhereInput[]
    NOT?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
    id?: StringFilter<"ServerMember"> | string
    userId?: StringFilter<"ServerMember"> | string
    serverId?: StringFilter<"ServerMember"> | string
    timeoutUntil?: DateTimeNullableFilter<"ServerMember"> | Date | string | null
  }

  export type ServerRolesUpsertWithWhereUniqueWithoutServerInput = {
    where: ServerRolesWhereUniqueInput
    update: XOR<ServerRolesUpdateWithoutServerInput, ServerRolesUncheckedUpdateWithoutServerInput>
    create: XOR<ServerRolesCreateWithoutServerInput, ServerRolesUncheckedCreateWithoutServerInput>
  }

  export type ServerRolesUpdateWithWhereUniqueWithoutServerInput = {
    where: ServerRolesWhereUniqueInput
    data: XOR<ServerRolesUpdateWithoutServerInput, ServerRolesUncheckedUpdateWithoutServerInput>
  }

  export type ServerRolesUpdateManyWithWhereWithoutServerInput = {
    where: ServerRolesScalarWhereInput
    data: XOR<ServerRolesUpdateManyMutationInput, ServerRolesUncheckedUpdateManyWithoutServerInput>
  }

  export type ServerRolesScalarWhereInput = {
    AND?: ServerRolesScalarWhereInput | ServerRolesScalarWhereInput[]
    OR?: ServerRolesScalarWhereInput[]
    NOT?: ServerRolesScalarWhereInput | ServerRolesScalarWhereInput[]
    id?: StringFilter<"ServerRoles"> | string
    name?: StringFilter<"ServerRoles"> | string
    position?: IntFilter<"ServerRoles"> | number
    serverId?: StringFilter<"ServerRoles"> | string
  }

  export type ServerInviteUpsertWithWhereUniqueWithoutServerInput = {
    where: ServerInviteWhereUniqueInput
    update: XOR<ServerInviteUpdateWithoutServerInput, ServerInviteUncheckedUpdateWithoutServerInput>
    create: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput>
  }

  export type ServerInviteUpdateWithWhereUniqueWithoutServerInput = {
    where: ServerInviteWhereUniqueInput
    data: XOR<ServerInviteUpdateWithoutServerInput, ServerInviteUncheckedUpdateWithoutServerInput>
  }

  export type ServerInviteUpdateManyWithWhereWithoutServerInput = {
    where: ServerInviteScalarWhereInput
    data: XOR<ServerInviteUpdateManyMutationInput, ServerInviteUncheckedUpdateManyWithoutServerInput>
  }

  export type ServerInviteScalarWhereInput = {
    AND?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
    OR?: ServerInviteScalarWhereInput[]
    NOT?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
    id?: StringFilter<"ServerInvite"> | string
    code?: StringFilter<"ServerInvite"> | string
    serverId?: StringFilter<"ServerInvite"> | string
    creatorId?: StringNullableFilter<"ServerInvite"> | string | null
    expiresAt?: DateTimeNullableFilter<"ServerInvite"> | Date | string | null
    maxUses?: IntNullableFilter<"ServerInvite"> | number | null
    currentUses?: IntFilter<"ServerInvite"> | number
    createdAt?: DateTimeFilter<"ServerInvite"> | Date | string
    updatedAt?: DateTimeFilter<"ServerInvite"> | Date | string
  }

  export type ServerCreateWithoutChannelsInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    members?: ServerMemberCreateNestedManyWithoutServerInput
    roles?: ServerRolesCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutChannelsInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    roles?: ServerRolesUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutChannelsInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
  }

  export type MessagesCreateWithoutChannelInput = {
    id?: string
    content: string
    createdAt?: Date | string
    pinned?: boolean
    author: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessagesUncheckedCreateWithoutChannelInput = {
    id?: string
    content: string
    authorId: string
    createdAt?: Date | string
    pinned?: boolean
  }

  export type MessagesCreateOrConnectWithoutChannelInput = {
    where: MessagesWhereUniqueInput
    create: XOR<MessagesCreateWithoutChannelInput, MessagesUncheckedCreateWithoutChannelInput>
  }

  export type MessagesCreateManyChannelInputEnvelope = {
    data: MessagesCreateManyChannelInput | MessagesCreateManyChannelInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutChannelsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessagesCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutChannelsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessagesUncheckedCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutChannelsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput>
  }

  export type ServerUpsertWithoutChannelsInput = {
    update: XOR<ServerUpdateWithoutChannelsInput, ServerUncheckedUpdateWithoutChannelsInput>
    create: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutChannelsInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutChannelsInput, ServerUncheckedUpdateWithoutChannelsInput>
  }

  export type ServerUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    roles?: ServerRolesUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    roles?: ServerRolesUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
  }

  export type MessagesUpsertWithWhereUniqueWithoutChannelInput = {
    where: MessagesWhereUniqueInput
    update: XOR<MessagesUpdateWithoutChannelInput, MessagesUncheckedUpdateWithoutChannelInput>
    create: XOR<MessagesCreateWithoutChannelInput, MessagesUncheckedCreateWithoutChannelInput>
  }

  export type MessagesUpdateWithWhereUniqueWithoutChannelInput = {
    where: MessagesWhereUniqueInput
    data: XOR<MessagesUpdateWithoutChannelInput, MessagesUncheckedUpdateWithoutChannelInput>
  }

  export type MessagesUpdateManyWithWhereWithoutChannelInput = {
    where: MessagesScalarWhereInput
    data: XOR<MessagesUpdateManyMutationInput, MessagesUncheckedUpdateManyWithoutChannelInput>
  }

  export type MessagesScalarWhereInput = {
    AND?: MessagesScalarWhereInput | MessagesScalarWhereInput[]
    OR?: MessagesScalarWhereInput[]
    NOT?: MessagesScalarWhereInput | MessagesScalarWhereInput[]
    id?: StringFilter<"Messages"> | string
    content?: StringFilter<"Messages"> | string
    channelId?: StringFilter<"Messages"> | string
    authorId?: StringFilter<"Messages"> | string
    createdAt?: DateTimeFilter<"Messages"> | Date | string
    pinned?: BoolFilter<"Messages"> | boolean
  }

  export type UserUpsertWithWhereUniqueWithoutChannelsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutChannelsInput, UserUncheckedUpdateWithoutChannelsInput>
    create: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutChannelsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutChannelsInput, UserUncheckedUpdateWithoutChannelsInput>
  }

  export type UserUpdateManyWithWhereWithoutChannelsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutChannelsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type ServerCreateWithoutMembersInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    channels?: ChannelCreateNestedManyWithoutServerInput
    roles?: ServerRolesCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    roles?: ServerRolesUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutMembersInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessagesCreateNestedManyWithoutAuthorInput
    channels?: ChannelCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessagesUncheckedCreateNestedManyWithoutAuthorInput
    channels?: ChannelUncheckedCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type ServerRolesCreateWithoutMembersInput = {
    id?: string
    name: string
    position?: number
    server: ServerCreateNestedOneWithoutRolesInput
    permissions?: ServerRolePermissionCreateNestedManyWithoutRoleInput
  }

  export type ServerRolesUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    position?: number
    serverId: string
    permissions?: ServerRolePermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type ServerRolesCreateOrConnectWithoutMembersInput = {
    where: ServerRolesWhereUniqueInput
    create: XOR<ServerRolesCreateWithoutMembersInput, ServerRolesUncheckedCreateWithoutMembersInput>
  }

  export type ServerUpsertWithoutMembersInput = {
    update: XOR<ServerUpdateWithoutMembersInput, ServerUncheckedUpdateWithoutMembersInput>
    create: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutMembersInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutMembersInput, ServerUncheckedUpdateWithoutMembersInput>
  }

  export type ServerUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUpdateManyWithoutServerNestedInput
    roles?: ServerRolesUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    roles?: ServerRolesUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessagesUpdateManyWithoutAuthorNestedInput
    channels?: ChannelUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessagesUncheckedUpdateManyWithoutAuthorNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type ServerRolesUpsertWithWhereUniqueWithoutMembersInput = {
    where: ServerRolesWhereUniqueInput
    update: XOR<ServerRolesUpdateWithoutMembersInput, ServerRolesUncheckedUpdateWithoutMembersInput>
    create: XOR<ServerRolesCreateWithoutMembersInput, ServerRolesUncheckedCreateWithoutMembersInput>
  }

  export type ServerRolesUpdateWithWhereUniqueWithoutMembersInput = {
    where: ServerRolesWhereUniqueInput
    data: XOR<ServerRolesUpdateWithoutMembersInput, ServerRolesUncheckedUpdateWithoutMembersInput>
  }

  export type ServerRolesUpdateManyWithWhereWithoutMembersInput = {
    where: ServerRolesScalarWhereInput
    data: XOR<ServerRolesUpdateManyMutationInput, ServerRolesUncheckedUpdateManyWithoutMembersInput>
  }

  export type ServerCreateWithoutRolesInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    channels?: ChannelCreateNestedManyWithoutServerInput
    members?: ServerMemberCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutRolesInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutRolesInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutRolesInput, ServerUncheckedCreateWithoutRolesInput>
  }

  export type ServerMemberCreateWithoutServerRolesInput = {
    id?: string
    timeoutUntil?: Date | string | null
    server: ServerCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type ServerMemberUncheckedCreateWithoutServerRolesInput = {
    id?: string
    userId: string
    serverId: string
    timeoutUntil?: Date | string | null
  }

  export type ServerMemberCreateOrConnectWithoutServerRolesInput = {
    where: ServerMemberWhereUniqueInput
    create: XOR<ServerMemberCreateWithoutServerRolesInput, ServerMemberUncheckedCreateWithoutServerRolesInput>
  }

  export type ServerRolePermissionCreateWithoutRoleInput = {
    id?: string
    permission: $Enums.Permission
  }

  export type ServerRolePermissionUncheckedCreateWithoutRoleInput = {
    id?: string
    permission: $Enums.Permission
  }

  export type ServerRolePermissionCreateOrConnectWithoutRoleInput = {
    where: ServerRolePermissionWhereUniqueInput
    create: XOR<ServerRolePermissionCreateWithoutRoleInput, ServerRolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type ServerRolePermissionCreateManyRoleInputEnvelope = {
    data: ServerRolePermissionCreateManyRoleInput | ServerRolePermissionCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type ServerUpsertWithoutRolesInput = {
    update: XOR<ServerUpdateWithoutRolesInput, ServerUncheckedUpdateWithoutRolesInput>
    create: XOR<ServerCreateWithoutRolesInput, ServerUncheckedCreateWithoutRolesInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutRolesInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutRolesInput, ServerUncheckedUpdateWithoutRolesInput>
  }

  export type ServerUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUpdateManyWithoutServerNestedInput
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
  }

  export type ServerMemberUpsertWithWhereUniqueWithoutServerRolesInput = {
    where: ServerMemberWhereUniqueInput
    update: XOR<ServerMemberUpdateWithoutServerRolesInput, ServerMemberUncheckedUpdateWithoutServerRolesInput>
    create: XOR<ServerMemberCreateWithoutServerRolesInput, ServerMemberUncheckedCreateWithoutServerRolesInput>
  }

  export type ServerMemberUpdateWithWhereUniqueWithoutServerRolesInput = {
    where: ServerMemberWhereUniqueInput
    data: XOR<ServerMemberUpdateWithoutServerRolesInput, ServerMemberUncheckedUpdateWithoutServerRolesInput>
  }

  export type ServerMemberUpdateManyWithWhereWithoutServerRolesInput = {
    where: ServerMemberScalarWhereInput
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyWithoutServerRolesInput>
  }

  export type ServerRolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: ServerRolePermissionWhereUniqueInput
    update: XOR<ServerRolePermissionUpdateWithoutRoleInput, ServerRolePermissionUncheckedUpdateWithoutRoleInput>
    create: XOR<ServerRolePermissionCreateWithoutRoleInput, ServerRolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type ServerRolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: ServerRolePermissionWhereUniqueInput
    data: XOR<ServerRolePermissionUpdateWithoutRoleInput, ServerRolePermissionUncheckedUpdateWithoutRoleInput>
  }

  export type ServerRolePermissionUpdateManyWithWhereWithoutRoleInput = {
    where: ServerRolePermissionScalarWhereInput
    data: XOR<ServerRolePermissionUpdateManyMutationInput, ServerRolePermissionUncheckedUpdateManyWithoutRoleInput>
  }

  export type ServerRolePermissionScalarWhereInput = {
    AND?: ServerRolePermissionScalarWhereInput | ServerRolePermissionScalarWhereInput[]
    OR?: ServerRolePermissionScalarWhereInput[]
    NOT?: ServerRolePermissionScalarWhereInput | ServerRolePermissionScalarWhereInput[]
    id?: StringFilter<"ServerRolePermission"> | string
    roleId?: StringFilter<"ServerRolePermission"> | string
    permission?: EnumPermissionFilter<"ServerRolePermission"> | $Enums.Permission
  }

  export type ServerRolesCreateWithoutPermissionsInput = {
    id?: string
    name: string
    position?: number
    server: ServerCreateNestedOneWithoutRolesInput
    members?: ServerMemberCreateNestedManyWithoutServerRolesInput
  }

  export type ServerRolesUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    position?: number
    serverId: string
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerRolesInput
  }

  export type ServerRolesCreateOrConnectWithoutPermissionsInput = {
    where: ServerRolesWhereUniqueInput
    create: XOR<ServerRolesCreateWithoutPermissionsInput, ServerRolesUncheckedCreateWithoutPermissionsInput>
  }

  export type ServerRolesUpsertWithoutPermissionsInput = {
    update: XOR<ServerRolesUpdateWithoutPermissionsInput, ServerRolesUncheckedUpdateWithoutPermissionsInput>
    create: XOR<ServerRolesCreateWithoutPermissionsInput, ServerRolesUncheckedCreateWithoutPermissionsInput>
    where?: ServerRolesWhereInput
  }

  export type ServerRolesUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: ServerRolesWhereInput
    data: XOR<ServerRolesUpdateWithoutPermissionsInput, ServerRolesUncheckedUpdateWithoutPermissionsInput>
  }

  export type ServerRolesUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    server?: ServerUpdateOneRequiredWithoutRolesNestedInput
    members?: ServerMemberUpdateManyWithoutServerRolesNestedInput
  }

  export type ServerRolesUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    serverId?: StringFieldUpdateOperationsInput | string
    members?: ServerMemberUncheckedUpdateManyWithoutServerRolesNestedInput
  }

  export type ChannelCreateWithoutMessagesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    type: $Enums.ChannelType
    server: ServerCreateNestedOneWithoutChannelsInput
    users?: UserCreateNestedManyWithoutChannelsInput
  }

  export type ChannelUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    serverId: string
    createdAt?: Date | string
    type: $Enums.ChannelType
    users?: UserUncheckedCreateNestedManyWithoutChannelsInput
  }

  export type ChannelCreateOrConnectWithoutMessagesInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    channels?: ChannelCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    channels?: ChannelUncheckedCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type ChannelUpsertWithoutMessagesInput = {
    update: XOR<ChannelUpdateWithoutMessagesInput, ChannelUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
    where?: ChannelWhereInput
  }

  export type ChannelUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChannelWhereInput
    data: XOR<ChannelUpdateWithoutMessagesInput, ChannelUncheckedUpdateWithoutMessagesInput>
  }

  export type ChannelUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    server?: ServerUpdateOneRequiredWithoutChannelsNestedInput
    users?: UserUpdateManyWithoutChannelsNestedInput
  }

  export type ChannelUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    users?: UserUncheckedUpdateManyWithoutChannelsNestedInput
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    channels?: ChannelUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type ServerCreateWithoutInvitesInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    channels?: ChannelCreateNestedManyWithoutServerInput
    members?: ServerMemberCreateNestedManyWithoutServerInput
    roles?: ServerRolesCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutInvitesInput = {
    id?: string
    name: string
    picture?: string | null
    createdAt?: Date | string
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    roles?: ServerRolesUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutInvitesInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutInvitesInput, ServerUncheckedCreateWithoutInvitesInput>
  }

  export type UserCreateWithoutCreatedInvitesInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessagesCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    channels?: ChannelCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutCreatedInvitesInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessagesUncheckedCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    channels?: ChannelUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutCreatedInvitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedInvitesInput, UserUncheckedCreateWithoutCreatedInvitesInput>
  }

  export type ServerUpsertWithoutInvitesInput = {
    update: XOR<ServerUpdateWithoutInvitesInput, ServerUncheckedUpdateWithoutInvitesInput>
    create: XOR<ServerCreateWithoutInvitesInput, ServerUncheckedCreateWithoutInvitesInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutInvitesInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutInvitesInput, ServerUncheckedUpdateWithoutInvitesInput>
  }

  export type ServerUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUpdateManyWithoutServerNestedInput
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    roles?: ServerRolesUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    roles?: ServerRolesUncheckedUpdateManyWithoutServerNestedInput
  }

  export type UserUpsertWithoutCreatedInvitesInput = {
    update: XOR<UserUpdateWithoutCreatedInvitesInput, UserUncheckedUpdateWithoutCreatedInvitesInput>
    create: XOR<UserCreateWithoutCreatedInvitesInput, UserUncheckedCreateWithoutCreatedInvitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedInvitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedInvitesInput, UserUncheckedUpdateWithoutCreatedInvitesInput>
  }

  export type UserUpdateWithoutCreatedInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessagesUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    channels?: ChannelUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessagesUncheckedUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MessagesCreateWithoutAuthorInput = {
    id?: string
    content: string
    createdAt?: Date | string
    pinned?: boolean
    channel: ChannelCreateNestedOneWithoutMessagesInput
  }

  export type MessagesUncheckedCreateWithoutAuthorInput = {
    id?: string
    content: string
    channelId: string
    createdAt?: Date | string
    pinned?: boolean
  }

  export type MessagesCreateOrConnectWithoutAuthorInput = {
    where: MessagesWhereUniqueInput
    create: XOR<MessagesCreateWithoutAuthorInput, MessagesUncheckedCreateWithoutAuthorInput>
  }

  export type MessagesCreateManyAuthorInputEnvelope = {
    data: MessagesCreateManyAuthorInput | MessagesCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ServerMemberCreateWithoutUserInput = {
    id?: string
    timeoutUntil?: Date | string | null
    server: ServerCreateNestedOneWithoutMembersInput
    serverRoles?: ServerRolesCreateNestedManyWithoutMembersInput
  }

  export type ServerMemberUncheckedCreateWithoutUserInput = {
    id?: string
    serverId: string
    timeoutUntil?: Date | string | null
    serverRoles?: ServerRolesUncheckedCreateNestedManyWithoutMembersInput
  }

  export type ServerMemberCreateOrConnectWithoutUserInput = {
    where: ServerMemberWhereUniqueInput
    create: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput>
  }

  export type ServerMemberCreateManyUserInputEnvelope = {
    data: ServerMemberCreateManyUserInput | ServerMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChannelCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    type: $Enums.ChannelType
    server: ServerCreateNestedOneWithoutChannelsInput
    messages?: MessagesCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    serverId: string
    createdAt?: Date | string
    type: $Enums.ChannelType
    messages?: MessagesUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelCreateOrConnectWithoutUsersInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput>
  }

  export type ServerInviteCreateWithoutCreatorInput = {
    id?: string
    code: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    server: ServerCreateNestedOneWithoutInvitesInput
  }

  export type ServerInviteUncheckedCreateWithoutCreatorInput = {
    id?: string
    code: string
    serverId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerInviteCreateOrConnectWithoutCreatorInput = {
    where: ServerInviteWhereUniqueInput
    create: XOR<ServerInviteCreateWithoutCreatorInput, ServerInviteUncheckedCreateWithoutCreatorInput>
  }

  export type ServerInviteCreateManyCreatorInputEnvelope = {
    data: ServerInviteCreateManyCreatorInput | ServerInviteCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type MessagesUpsertWithWhereUniqueWithoutAuthorInput = {
    where: MessagesWhereUniqueInput
    update: XOR<MessagesUpdateWithoutAuthorInput, MessagesUncheckedUpdateWithoutAuthorInput>
    create: XOR<MessagesCreateWithoutAuthorInput, MessagesUncheckedCreateWithoutAuthorInput>
  }

  export type MessagesUpdateWithWhereUniqueWithoutAuthorInput = {
    where: MessagesWhereUniqueInput
    data: XOR<MessagesUpdateWithoutAuthorInput, MessagesUncheckedUpdateWithoutAuthorInput>
  }

  export type MessagesUpdateManyWithWhereWithoutAuthorInput = {
    where: MessagesScalarWhereInput
    data: XOR<MessagesUpdateManyMutationInput, MessagesUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ServerMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: ServerMemberWhereUniqueInput
    update: XOR<ServerMemberUpdateWithoutUserInput, ServerMemberUncheckedUpdateWithoutUserInput>
    create: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput>
  }

  export type ServerMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: ServerMemberWhereUniqueInput
    data: XOR<ServerMemberUpdateWithoutUserInput, ServerMemberUncheckedUpdateWithoutUserInput>
  }

  export type ServerMemberUpdateManyWithWhereWithoutUserInput = {
    where: ServerMemberScalarWhereInput
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type ChannelUpsertWithWhereUniqueWithoutUsersInput = {
    where: ChannelWhereUniqueInput
    update: XOR<ChannelUpdateWithoutUsersInput, ChannelUncheckedUpdateWithoutUsersInput>
    create: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput>
  }

  export type ChannelUpdateWithWhereUniqueWithoutUsersInput = {
    where: ChannelWhereUniqueInput
    data: XOR<ChannelUpdateWithoutUsersInput, ChannelUncheckedUpdateWithoutUsersInput>
  }

  export type ChannelUpdateManyWithWhereWithoutUsersInput = {
    where: ChannelScalarWhereInput
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyWithoutUsersInput>
  }

  export type ServerInviteUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ServerInviteWhereUniqueInput
    update: XOR<ServerInviteUpdateWithoutCreatorInput, ServerInviteUncheckedUpdateWithoutCreatorInput>
    create: XOR<ServerInviteCreateWithoutCreatorInput, ServerInviteUncheckedCreateWithoutCreatorInput>
  }

  export type ServerInviteUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ServerInviteWhereUniqueInput
    data: XOR<ServerInviteUpdateWithoutCreatorInput, ServerInviteUncheckedUpdateWithoutCreatorInput>
  }

  export type ServerInviteUpdateManyWithWhereWithoutCreatorInput = {
    where: ServerInviteScalarWhereInput
    data: XOR<ServerInviteUpdateManyMutationInput, ServerInviteUncheckedUpdateManyWithoutCreatorInput>
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessagesCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    channels?: ChannelCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessagesUncheckedCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    channels?: ChannelUncheckedCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessagesUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    channels?: ChannelUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessagesUncheckedUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    messages?: MessagesCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    channels?: ChannelCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    messages?: MessagesUncheckedCreateNestedManyWithoutAuthorInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    channels?: ChannelUncheckedCreateNestedManyWithoutUsersInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    messages?: MessagesUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    channels?: ChannelUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessagesUncheckedUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutUsersNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type ChannelCreateManyServerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    type: $Enums.ChannelType
  }

  export type ServerMemberCreateManyServerInput = {
    id?: string
    userId: string
    timeoutUntil?: Date | string | null
  }

  export type ServerRolesCreateManyServerInput = {
    id?: string
    name: string
    position?: number
  }

  export type ServerInviteCreateManyServerInput = {
    id?: string
    code: string
    creatorId?: string | null
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    messages?: MessagesUpdateManyWithoutChannelNestedInput
    users?: UserUpdateManyWithoutChannelsNestedInput
  }

  export type ChannelUncheckedUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    messages?: MessagesUncheckedUpdateManyWithoutChannelNestedInput
    users?: UserUncheckedUpdateManyWithoutChannelsNestedInput
  }

  export type ChannelUncheckedUpdateManyWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
  }

  export type ServerMemberUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    serverRoles?: ServerRolesUpdateManyWithoutMembersNestedInput
  }

  export type ServerMemberUncheckedUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serverRoles?: ServerRolesUncheckedUpdateManyWithoutMembersNestedInput
  }

  export type ServerMemberUncheckedUpdateManyWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServerRolesUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    members?: ServerMemberUpdateManyWithoutServerRolesNestedInput
    permissions?: ServerRolePermissionUpdateManyWithoutRoleNestedInput
  }

  export type ServerRolesUncheckedUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    members?: ServerMemberUncheckedUpdateManyWithoutServerRolesNestedInput
    permissions?: ServerRolePermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type ServerRolesUncheckedUpdateManyWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type ServerInviteUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutCreatedInvitesNestedInput
  }

  export type ServerInviteUncheckedUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    creatorId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteUncheckedUpdateManyWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    creatorId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessagesCreateManyChannelInput = {
    id?: string
    content: string
    authorId: string
    createdAt?: Date | string
    pinned?: boolean
  }

  export type MessagesUpdateWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessagesUncheckedUpdateWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessagesUncheckedUpdateManyWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessagesUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessagesUncheckedUpdateManyWithoutAuthorNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateManyWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerRolesUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    server?: ServerUpdateOneRequiredWithoutRolesNestedInput
    permissions?: ServerRolePermissionUpdateManyWithoutRoleNestedInput
  }

  export type ServerRolesUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    serverId?: StringFieldUpdateOperationsInput | string
    permissions?: ServerRolePermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type ServerRolesUncheckedUpdateManyWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    serverId?: StringFieldUpdateOperationsInput | string
  }

  export type ServerRolePermissionCreateManyRoleInput = {
    id?: string
    permission: $Enums.Permission
  }

  export type ServerMemberUpdateWithoutServerRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type ServerMemberUncheckedUpdateWithoutServerRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServerMemberUncheckedUpdateManyWithoutServerRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServerRolePermissionUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
  }

  export type ServerRolePermissionUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
  }

  export type ServerRolePermissionUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
  }

  export type SessionCreateManyUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessagesCreateManyAuthorInput = {
    id?: string
    content: string
    channelId: string
    createdAt?: Date | string
    pinned?: boolean
  }

  export type ServerMemberCreateManyUserInput = {
    id?: string
    serverId: string
    timeoutUntil?: Date | string | null
  }

  export type ServerInviteCreateManyCreatorInput = {
    id?: string
    code: string
    serverId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    currentUses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessagesUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessagesUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessagesUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServerMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    serverRoles?: ServerRolesUpdateManyWithoutMembersNestedInput
  }

  export type ServerMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serverRoles?: ServerRolesUncheckedUpdateManyWithoutMembersNestedInput
  }

  export type ServerMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    timeoutUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChannelUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    server?: ServerUpdateOneRequiredWithoutChannelsNestedInput
    messages?: MessagesUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    messages?: MessagesUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
  }

  export type ServerInviteUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutInvitesNestedInput
  }

  export type ServerInviteUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}