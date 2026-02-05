# Canvas API (Submissions) Quick Reference

## Authentication

- HTTP header: `Authorization: Bearer <token>`
- Base URL: `https://<canvas-domain>`

## List Assignment Submissions

```
GET /api/v1/courses/:course_id/assignments/:assignment_id/submissions
```

Recommended parameters:
- `per_page=100`
- `include[]=user`
- `include[]=submission_history`
- `include[]=attachments`

## Pagination

Canvas uses `Link` headers for pagination. Follow the `rel="next"` URL until it disappears.

## Common Fields to Capture

- `user` (id, name, login_id)
- `submission_history` (latest attempt, body, submitted_at)
- `attachments` (filename, url/download_url, size)
- `workflow_state` (submitted/unsubmitted)
- `score`, `grade`, `late`, `missing`
