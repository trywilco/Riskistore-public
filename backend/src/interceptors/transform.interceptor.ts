import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // If data is an array, transform each item
        if (Array.isArray(data)) {
          return data.map(item => this.transformItem(item));
        }
        // If data is a single item, transform it
        return this.transformItem(data);
      })
    );
  }

  private transformItem(item: any) {
    // If item is an object, convert numeric fields
    if (typeof item === 'object' && item !== null) {
      // Specifically handle price conversion
      if (item.price !== undefined) {
        item.price = Number(item.price);
      }
      return item;
    }
    return item;
  }
}
