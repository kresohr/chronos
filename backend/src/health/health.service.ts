import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService, 
    private readonly http: HttpHealthIndicator, 
    private readonly prisma: PrismaService,
  ) {}

  async checkHealth() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://www.google.com'), // External health check
      async () => {
        await this.prisma.$queryRaw`SELECT 1`; // Database health check
        return { prisma: { status: 'up' } };
      },
    ]);
  }
}
