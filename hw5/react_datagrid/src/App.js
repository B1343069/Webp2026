import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';

const dataUrl =
  'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';

const fallbackData = [
  {
    title: '台灣豫劇團演出活動',
    showInfo: [{ location: '高雄市左營區', price: '免費入場' }],
  },
  {
    title: '夏日音樂劇場',
    showInfo: [{ location: '台北市中正區', price: '300' }],
  },
  {
    title: '親子藝文展演',
    showInfo: [{ location: '台中市西區', price: '100' }],
  },
];

function normalizeData(data) {
  return data.map((item, index) => {
    const show = Array.isArray(item.showInfo) && item.showInfo.length > 0 ? item.showInfo[0] : {};

    return {
      id: `${item.title || item.name || 'show'}-${index}`,
      name: item.title || item.name || '未提供名稱',
      place: show.location || show.locationName || item.location || '未提供地點',
      price: show.price || item.price || '未提供票價',
    };
  });
}

const columns = [
  {
    field: 'name',
    headerName: '名稱',
    flex: 1.5,
    minWidth: 320,
  },
  {
    field: 'place',
    headerName: '地點',
    flex: 1,
    minWidth: 220,
  },
  {
    field: 'price',
    headerName: '票價',
    flex: 0.8,
    minWidth: 180,
  },
];

function App() {
  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadShows() {
      try {
        const response = await fetch(dataUrl, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('API 回應失敗');
        }

        const data = await response.json();
        setRows(normalizeData(data));
      } catch (loadError) {
        if (loadError.name === 'AbortError') {
          return;
        }

        setRows(normalizeData(fallbackData));
        setError('API 暫時無法讀取，已改用備用資料。');
      } finally {
        setLoading(false);
      }
    }

    loadShows();

    return () => controller.abort();
  }, []);

  const filteredRows = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();

    if (!trimmedKeyword) {
      return rows;
    }

    return rows.filter((row) =>
      [row.name, row.place, row.price].some((value) =>
        String(value).toLowerCase().includes(trimmedKeyword)
      )
    );
  }, [keyword, rows]);

  return (
    <main className="app-shell">
      <Box className="header">
        <Typography component="h1" variant="h3">
          藝文活動 DataGrid
        </Typography>
        <TextField
          className="search"
          label="搜尋名稱、地點或票價"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          size="small"
        />
      </Box>

      {error && (
        <Alert className="status" severity="warning">
          {error}
        </Alert>
      )}

      <Box className="grid-wrap">
        {loading ? (
          <Box className="loading">
            <CircularProgress size={36} />
            <Typography>資料載入中...</Typography>
          </Box>
        ) : (
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
          />
        )}
      </Box>
    </main>
  );
}

export default App;
