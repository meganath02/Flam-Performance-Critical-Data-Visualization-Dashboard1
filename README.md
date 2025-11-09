# Performance-Critical Data Visualization Dashboard

## Project Overview
This project is a **high-performance real-time data visualization dashboard** built with **Next.js 14+ App Router** and **TypeScript**. It is designed to render and update **10,000+ data points at 60fps** while maintaining smooth interactivity and minimal memory usage. The dashboard supports multiple chart types including **line, bar, scatter, and heatmap**, along with features like real-time updates every 100ms, interactive zoom and pan, data filtering, and time range selection. Data aggregation allows grouping points by 1 minute, 5 minutes, or 1 hour, and virtual scrolling enables handling large datasets in tables. The design is fully responsive across desktop, tablet, and mobile devices.

## Features
- Multiple chart types: Line, Bar, Scatter, Heatmap  
- Real-time updates every 100ms  
- Interactive controls: Zoom, Pan, Filter, Time-range selection  
- Data aggregation by 1min, 5min, 1hour  
- Virtual scrolling for large tables  
- Responsive design for all devices  
- FPS and memory usage monitoring  
- Performance stress test mode  

## Technical Stack
- **Frontend:** Next.js 14+ App Router + TypeScript  
- **Rendering:** Canvas + SVG hybrid approach  
- **State Management:** React Hooks + Context API  
- **Data:** Realistic time-series simulation  
- **Bonus:** Web Workers for background data processing  
- **No chart libraries** used (D3.js, Chart.js)  

## Performance Optimizations
- Memoization using `useMemo` and `useCallback`  
- `React.memo` for expensive components  
- Non-blocking updates using `useTransition`  
- Virtualized lists for large datasets  
- Efficient Canvas rendering with `requestAnimationFrame`  
- Concurrent rendering and proper cleanup of hooks  

## Setup and Running
Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd performance-dashboard
npm install
