export const REDIS_SERVICE = 'REDIS_SERVICE';
export default interface IRedisService {
  publish(channel: string, message: string): Promise<void>;
  subscribe(channel: string): Promise<void>;
}
